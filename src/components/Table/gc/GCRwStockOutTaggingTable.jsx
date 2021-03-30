import { Button, Col, InputNumber, Row, Tag } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { i18NCode } from "../../../api/const/i18n";
import RwMLotManagerRequest from "../../../api/gc/rw-manager/RwMLotManagerRequest";
import EventUtils from "../../../api/utils/EventUtils";
import I18NUtils from "../../../api/utils/I18NUtils";
import MessageUtils from "../../../api/utils/MessageUtils";
import { Notification } from "../../notice/Notice";
import EntityListCheckTable from "../EntityListCheckTable";
import RWStockOutTagMLotForm from "./RWStockOutTagMLotForm";



export default class GCRwStockOutTaggingTable extends EntityListCheckTable {

    static displayName = 'GCRwStockOutTaggingTable';

    createButtonGroup = () => {
        let buttons = [];
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
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{this.state.data.length}</Tag>
    }

    createWaferNumber = () => {
        let materialLots = this.state.data;
        let qty = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if (data.currentSubQty != undefined) {
                    qty = qty + parseInt(data.currentSubQty);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{qty}</Tag>
    }

    createSelectCurrentQty = () => {
        let selectQty = 0;
        const {selectedRows} = this.state;
        let materialLotList = selectedRows;
        if(materialLotList && materialLotList.length > 0){
            materialLotList.forEach(data => {
                selectQty = selectQty + data.currentQty;
            });
        }
        return <Tag color="#D2480A">{I18NUtils.getClientMessage(i18NCode.SelectQty)}：{selectQty}</Tag>
    }

    createForm = () => {
        return  <RWStockOutTagMLotForm visible={this.state.formVisible} 
                                     stockTagNote={this.state.stockTagNote} 
                                     materialLots={this.state.materialLots}
                                     materialName={this.state.materialName}
                                     width={1440}
                                     onOk={this.handleTagSuccess} 
                                     onCancel={this.handleCancel}/>
    }
    
    handleTagSuccess = () => {
        this.materialLots = [],
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
        const {data} = this.state;
        let materialLots = this.getSelectedRows();
        if (materialLots.length === 0 ) {
            return;
        }
        this.validationMLotMaterialName(materialLots);
    }

    validationMLotMaterialName = (materialLots) => {
        const self = this;
        let stockTagNote = this.input.state.value;
        let requestObject = {
          materialLots: materialLots,
          success: function(responseBody) {
              let materialName = materialLots[0].materialName;
            self.setState({
                formVisible : true,
                materialLots: materialLots,
                stockTagNote: stockTagNote,
                materialName: materialName,
            }); 
          }
        }
        RwMLotManagerRequest.sendValidateMlotMaterialNameRequest(requestObject);
    } 
    
    autoPick = () => {
        debugger;
        let self = this;
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
                materialLotList: data,
                pickQty: pickQty,
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
            RwMLotManagerRequest.sendAutoPickTagMLotRequest(requestObject);
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
