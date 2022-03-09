import { Button, Col, Input, Row, Tag , Upload} from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import RwMLotManagerRequest from "../../../api/gc/rw-manager/RwMLotManagerRequest";
import EntityListCheckTable from '../EntityListCheckTable';
import FormItem from 'antd/lib/form/FormItem';
import EventUtils from '../../../api/utils/EventUtils';
import { Notification } from '../../notice/Notice';
import MaterialLotUpdateRequest from '../../../api/gc/materialLot-update-manager/MaterialLotUpdateRequest';
import RWStockOutTagUpdateMLotForm from './RWStockOutTagUpdateMLotForm';

export default class GCRwStockOutTaggingUpdateTable extends EntityListCheckTable {

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createExportDataAndTemplateButton());
        buttons.push(this.createImportSearchButton());
        buttons.push(this.createAddShipOrderButton());
        buttons.push(this.createCancelShipOrderButton());
        buttons.push(this.createPreviewButton());
        buttons.push(this.createCancelStockOutButton());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createAddShipOrderInput());
        tags.push(this.createStatistic());
        tags.push(this.createWaferNumber());
        tags.push(this.createTotalNumber());
        return tags;
    }
    
    createAddShipOrderInput = () => {
        return  <FormItem>
                    <Row gutter={6}>
                        <Col span={2} >
                            <span>{I18NUtils.getClientMessage(i18NCode.ShipOrderId)}:</span>
                        </Col>
                        <Col span={4}>
                            <Input ref={(shipOrderId) => { this.shipOrderId = shipOrderId }} key="shipOrderId" placeholder="发货单号" />
                        </Col>
                    </Row>
                </FormItem>
    }

    UnstockOutTag = () => {
        let self = this;
        let materialLotList = this.getSelectedRows();
        if (materialLotList.length === 0 ) {
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let requestObject = {
            materialLotList : materialLotList,
            success: function(responseBody) {
                self.refreshDelete(materialLotList);
            }
        }
        RwMLotManagerRequest.sendUnStockOutTagRequest(requestObject);
    }

    AddShipOrder = () => {
        let self = this;
        let materialLotList = this.getSelectedRows();
        if (materialLotList.length === 0 ) {
            return;
        }
        
        let shipOrderId = this.shipOrderId.state.value;
        if(shipOrderId == "" || shipOrderId == null || shipOrderId == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.EnterTheShipOrdderIdPlease));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let requestObject = {
            materialLotList : materialLotList,
            shipOrderId: shipOrderId,
            success: function(responseBody) {
                self.setState({
                    selectedRowKeys: [],
                    selectedRows: [],
                });
                self.shipOrderId.setState({
                    value: "",
                });
                if (self.props.resetData) {
                    self.props.resetData();
                    self.props.onSearch();
                }
            }
        }
        RwMLotManagerRequest.sendAddShipOrderIdRequest(requestObject);
    }

    Preview = () => {
        let self = this;
        let materialLots = this.getSelectedRows();
        if (materialLots.length === 0 ) {
            return;
        }

        // self.setState({
        //     loading: true
        // });
        // EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let requestObject = {
            materialLotList : materialLots,
            success: function(responseBody) {
                let materialLotInfo = responseBody.materialLotList;
                self.setState({
                    formVisible : true,
                    materialLotInfo: materialLotInfo,
                }); 
            }
        }
        RwMLotManagerRequest.sendPreViewMLotRequest(requestObject);
    }

    createForm = () => {
        return  <RWStockOutTagUpdateMLotForm visible={this.state.formVisible} 
                                     materialLotInfo={this.state.materialLotInfo}
                                     width={1440}
                                     onOk={this.handleCancel} 
                                     onCancel={this.handleCancel}/>
    }

    handleCancel = (e) => {
        this.setState({
            formVisible: false,
        })
    }

    CancelShipOrder = () => {
        let self = this;
        let materialLotList = this.getSelectedRows();
        if (materialLotList.length === 0 ) {
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let requestObject = {
            materialLotList : materialLotList,
            success: function(responseBody) {
                self.setState({
                    selectedRowKeys: [],
                    selectedRows: [],
                });
                if (self.props.resetData) {
                    self.props.resetData();
                    self.props.onSearch();
                }
            }
        }
        RwMLotManagerRequest.sendCancelShipOrderIdRequest(requestObject);
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
                let materialLotList = responseBody.materialLotList;
                self.setState({
                    data: materialLotList,
                    loading: false
                });           
            }
        }
        MaterialLotUpdateRequest.sendImportSearchRequest(object, option.file);
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

    buildOperationColumn = () => {

    }

    createAddShipOrderButton = () => {
        return <Button key="addShipOrder" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.AddShipOrder}>
                        {I18NUtils.getClientMessage(i18NCode.BtnAddShipOrder)}
                    </Button>
    }

    createImportSearchButton = () => {
        return (<Upload key="importSearch" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                    customRequest={(option) => this.importSearch(option)} showUploadList={false} >
                    <Button type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-add">{I18NUtils.getClientMessage(i18NCode.BtnImportSearch)}</Button>
                </Upload>);
    }

    createCancelShipOrderButton = () => {
        return <Button key="cancelShipOrder" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.CancelShipOrder}>
                        {I18NUtils.getClientMessage(i18NCode.BtnCancelShipOrder)}
                    </Button>
    }

    createPreviewButton = () => {
        return <Button key="preview" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.Preview}>
                        {I18NUtils.getClientMessage(i18NCode.BtnPreview)}
                    </Button>
    }

    createCancelStockOutButton = () => {
        return <Button key="unStockOutTag" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.UnstockOutTag}>
                        {I18NUtils.getClientMessage(i18NCode.BtnUnTagging)}
                    </Button>
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
