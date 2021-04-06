import { Button, Col, Input, Row, Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import RwMLotManagerRequest from "../../../api/gc/rw-manager/RwMLotManagerRequest";
import EntityListCheckTable from '../EntityListCheckTable';
import FormItem from 'antd/lib/form/FormItem';
import EventUtils from '../../../api/utils/EventUtils';
import { Notification } from '../../notice/Notice';

export default class GCRwStockOutTaggingUpdateTable extends EntityListCheckTable {

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddShipOrderButton());
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
