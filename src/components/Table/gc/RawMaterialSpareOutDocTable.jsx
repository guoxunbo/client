import { Button, Col, InputNumber, Row,Tag } from "antd";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import EntityListCheckTable from "../EntityListCheckTable";
import FormItem from "antd/lib/form/FormItem";
import EventUtils from "../../../api/utils/EventUtils";
import GCRawMaterialImportRequest from "../../../api/gc/GCRawMaterialImport-manager/GCRawMaterialImportRequest";
import MessageUtils from "../../../api/utils/MessageUtils";
import { Notification } from '../../notice/Notice';


export default class RawMaterialSpareOutDocTable extends EntityListCheckTable{

    displayName='RawMaterialSpareOutDocTable';

    createTagGroup = () => {
        let tagList = [];
        tagList.push(this.createNeedNumberInput());
        tagList.push(this.createStatistic());
        tagList.push(this.createTotalNumber());
        tagList.push(this.createMissZeroQtyTag());
        return tagList;
    }

    createButtonGroup = () =>{
        let buttons=[];
        buttons.push(this.spareMaterialButton());
        buttons.push(this.spareMaterialConfirmButton());
        return buttons;
    }

    createMissZeroQtyTag = () => {
        const {selectedRows} = this.state;
        let materialLotList = selectedRows;
        let selectQty = 0;
        if(materialLotList && materialLotList.length > 0){
            materialLotList.forEach(data => {
                selectQty = selectQty + data.currentQty*10000;
            });
        }
        return <Tag color="#D2480A">{I18NUtils.getClientMessage(i18NCode.SelectQty)}：{selectQty/10000}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalStrokeCount)}:{this.state.data.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if (data.currentQty != undefined) {
                    count = count + data.currentQty*10000;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalNumber)}：{count/10000}</Tag>
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

    spareMaterialConfirm = () => {
        let self = this;
        let materialLotList = this.getSelectedRows();
        if (materialLotList.length === 0) {
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));

        let requestObj = {
            materialLotList : materialLotList,
            success: function(responseBody) {
                let spareCode = responseBody.spareCode;
                self.setState({
                    selectedRows: [],
                    selectedRowKeys: [],
                });
                if (self.props.resetData) {
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess(I18NUtils.getClientMessage(i18NCode.OperationSucceed) + `:${spareCode}`);
            }
        }
        GCRawMaterialImportRequest.sendRawMaterialSpareOutDoc(requestObj);
    }

    spareMaterial = () => {
        let self = this;
        let rowKey = this.props.rowKey || DefaultRowKey;
        const {data} = this.state;
        let pickQty = this.pickQty.inputNumberRef.currentValue;
        if (pickQty == null || pickQty == "" || pickQty == undefined) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.EnterRawMaterialSpareQtyPlease));
            return;
        }
        if (data.length === 0 ) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));

        let requestObj = {
            pickQty : pickQty,
            materialLotList : data,
            success: function(responseBody) {
                let materialLotList = responseBody.materialLotList;
                materialLotList.forEach(materialLot => {
                    self.setSelectMLot(materialLot);
                    data.forEach(mLot => {
                        if(mLot[rowKey] === materialLot[rowKey]){
                            let dataIndex = data.indexOf(mLot);
                            if (dataIndex > -1 ) {
                                data.splice(dataIndex, 1);
                            }
                            data.unshift(materialLot);
                        }
                    });
                });
            }
        }
        GCRawMaterialImportRequest.sendGetRawMaterialSpareOutDoc(requestObj);
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

    spareMaterialButton = () => {
        return <Button key="spareMaterial" type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-excel" onClick={this.spareMaterial}>
                   {I18NUtils.getClientMessage(i18NCode.BtnSpareMaterial)}
                    </Button>
    }

    spareMaterialConfirmButton = () => {
        return <Button key="spareMaterialConfirm" type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-excel" onClick={this.spareMaterialConfirm}>
                   {I18NUtils.getClientMessage(i18NCode.BtnSpareMaterialConfirm)}
                    </Button>
    }

    buildOperationColumn = () => {
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};