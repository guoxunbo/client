import { Button, Col, InputNumber, Row, Tag, Upload } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { i18NCode } from "../../../api/const/i18n";
import MaterialLotUpdateRequest from "../../../api/gc/materialLot-update-manager/MaterialLotUpdateRequest";
import RwMLotManagerRequest from "../../../api/gc/rw-manager/RwMLotManagerRequest";
import EventUtils from "../../../api/utils/EventUtils";
import I18NUtils from "../../../api/utils/I18NUtils";
import MessageUtils from "../../../api/utils/MessageUtils";
import { Notification } from "../../notice/Notice";
import EntityListCheckTable from "../EntityListCheckTable";
import COBWaferStockOutTagMLotForm from "./COBWaferStockOutTagMLotForm";



export default class GCCOBWaferStockOutTagTable extends EntityListCheckTable {

    static displayName = 'GCCOBWaferStockOutTagTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{formTable: {fields: []}}};
    }

    componentWillReceiveProps = (props) => {
        let {selectedRowKeys, selectedRows} = this.state;
        let columnData = this.buildColumn(props.table);;
        let stateSeletcedRowKeys = selectedRowKeys.merge(props.selectedRowKeys);
        let stateSelectedRows = selectedRows.merge(props.selectedRows, this.props.rowKey);
        if (props.resetFlag) {
            stateSeletcedRowKeys = [];
            stateSelectedRows = [];
        }
        
        this.setState({
            data: props.data,
            table: props.table,
            columns: columnData.columns,
            scrollX: columnData.scrollX,
            selectedRowKeys: stateSeletcedRowKeys || [],
            selectedRows: stateSelectedRows || [],
            pagination: props.pagination != undefined ? props.pagination : Application.table.pagination
        })
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createExportDataAndTemplateButton());
        buttons.push(this.createImportSearchButton());
        buttons.push(this.createAutoPickButton());
        buttons.push(this.createTagButton());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createNeedNumberInput());
        tags.push(this.createStatistic());
        tags.push(this.createWaferNumber());
        tags.push(this.createTotalNumber());
        tags.push(this.createSelectCurrentQty());
        return tags;
    }

    createNeedNumberInput = () => {
        return  <FormItem>
                    <Row gutter={4}>
                        <Col span={2} >
                            <span>{I18NUtils.getClientMessage(i18NCode.NeedQty)}:</span>
                        </Col>
                        <Col span={2}>
                            <InputNumber ref={(pickQty) => { this.pickQty = pickQty }} disabled={this.disabled}/>
                        </Col>
                    </Row>
                </FormItem>
    }

    createTotalNumber = () => {
        let materialLotUnits = this.state.data;
        let count = 0;
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    createWaferNumber = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{this.state.data.length}</Tag>
    }

    createStatistic = () => {
        let materialLotUnits = this.state.data;
        let lotIdList = [];
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (lotIdList.indexOf(data.lotId) == -1) {
                    lotIdList.push(data.lotId);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{lotIdList.length}</Tag>
    }

    createSelectCurrentQty = () => {
        let selectQty = 0;
        const {selectedRows} = this.state;
        let materialLotUnitList = selectedRows;
        if(materialLotUnitList && materialLotUnitList.length > 0){
            materialLotUnitList.forEach(data => {
                selectQty = selectQty + data.currentQty;
            });
        }
        return <Tag color="#D2480A">{I18NUtils.getClientMessage(i18NCode.SelectQty)}：{selectQty}</Tag>
    }

    createForm = () => {
        return  <COBWaferStockOutTagMLotForm visible={this.state.formVisible} 
                                     materialLotUnits={this.state.materialLotUnits}
                                     width={1440}
                                     onOk={this.handleTagSuccess} 
                                     onCancel={this.handleCancel}/>
    }
    
    handleTagSuccess = () => {
        this.materialLotUnits = [],
        this.setState({
            selectedRows: [],
            selectedRowKeys: [],
            formVisible : false,
        });
        if (this.props.resetData) {
            this.props.resetData();
        }
        MessageUtils.showOperationSuccess();
    }

    handleCancel = (e) => {
        this.setState({
            formVisible: false,
        })
    }

    stockOutTag = () => {
        let self = this;
        const {data} = this.state;
        let materialLotUnits = this.getSelectedRows();
        if (materialLotUnits.length === 0 ) {
            return;
        }
        self.setState({
            formVisible : true,
            materialLotUnits: materialLotUnits,
        }); 
    }
    
    autoPick = () => {
        let self = this;
        let rowKey = this.props.rowKey || DefaultRowKey;
        const{data} = this.state;
        let pickQty = this.pickQty.inputNumberRef.currentValue;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(pickQty == "" || pickQty == null || pickQty == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.EnterTheRequiredQtyPlease));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        if (data && data.length > 0) {
            let requestObject = {
                materialLotUnitList: data,
                pickQty: pickQty,
                success: function(responseBody) {
                    let materialLotUnitList = responseBody.materialLotUnitList;
                    materialLotUnitList.forEach(materialLotUnit => {
                        self.setSelectMLot(materialLotUnit);
                        data.forEach(mLot => {
                            if(mLot[rowKey] === materialLotUnit[rowKey]){
                                let dataIndex = data.indexOf(mLot);
                                if (dataIndex > -1 ) {
                                    data.splice(dataIndex, 1);
                                }
                                data.unshift(materialLotUnit);
                            }
                        });
                    });
                }
            }
            RwMLotManagerRequest.sendAutoPickTagMLotUnitRequest(requestObject);
        }
    }

    setSelectMLot = (record) => {
        let rowKey = this.props.rowKey || DefaultRowKey;
        const selectedRowKeys = [...this.state.selectedRowKeys];
        const selectedRows = [...this.state.selectedRows];

        let checkIndex = selectedRowKeys.indexOf(record[rowKey]);
        if (checkIndex < 0) {
            selectedRowKeys.push(record[rowKey]);
            selectedRows.push(record);
        }
        this.setState({ 
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
        });
    }

    importSearch = (option) => {
        const self = this;
        const {table} = this.state;
        let tableData = this.state.data;
        if(tableData.length > 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.TableDataMustBeEmpty));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let object = {
            tableRrn: table.objectRrn,
            success: function(responseBody) {
                let materialLotUnitList = responseBody.materialLotUnitList;
                self.setState({
                    data: materialLotUnitList,
                    loading: false
                });           
            }
        }
        MaterialLotUpdateRequest.sendImportSearchMLotUnitRequest(object, option.file);
    }

    createImportSearchButton = () => {
        return (<Upload key="importSearch" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                    customRequest={(option) => this.importSearch(option)} showUploadList={false} >
                    <Button type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-add">{I18NUtils.getClientMessage(i18NCode.BtnImportSearch)}</Button>
                </Upload>);
    }

    createTagButton = () => {
        return <Button key="stockOutTag" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.stockOutTag}>
                        {I18NUtils.getClientMessage(i18NCode.BtnTagging)}
                    </Button>
    }

    createAutoPickButton = () => {
        return <Button key="autoPick" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.autoPick}>
                        {I18NUtils.getClientMessage(i18NCode.BtnAutoPick)}
                    </Button>
    }


   buildOperationColumn = () => {
   }

}

const styles = {
    input: {
        width: 300
    },
    tableButton: {
        marginLeft:'20px'
    }
};
