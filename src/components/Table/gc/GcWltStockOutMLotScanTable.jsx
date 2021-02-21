
import EntityScanViewTable from '../EntityScanViewTable';
import { Button, Switch, Tag } from 'antd';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import EventUtils from '../../../api/utils/EventUtils';
import WltStockOutManagerRequest from '../../../api/gc/wlt-stock-out/WltStockOutManagerRequest';
import Icon from '@icedesign/icon';

/**
 * WLT/CP出货的物料批次表格
 */
export default class GcWltStockOutMLotScanTable extends EntityScanViewTable {

    static displayName = 'GcWltStockOutMLotScanTable';

    constructor(props) {
        super(props);
        this.state = {...this.state,...{checked:true},...{value: "checkSubCodeFlag"}};
    }

    getRowClassName = (record, index) => {
        if (record.errorFlag) {
            return 'error-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStockOut());
        buttons.push(this.createThreeSideShip());
        return buttons;
    }

    createTagGroup = () => {
        let tagList = [];
        tagList.push(this.createCheckSubcodeFlag());
        tagList.push(this.createStatistic());
        tagList.push(this.createWaferNumber());
        tagList.push(this.createTotalNumber());
        tagList.push(this.createErrorNumberStatistic());
        return tagList;
    }

    createCheckSubcodeFlag = () => {
        return <span style={{display: 'flex'}}>
            <span style={{marginLeft:"30px", fontSize:"16px"}}>{I18NUtils.getClientMessage(i18NCode.CheckSubCodeFlag)}:</span>
            <span style = {{marginLeft:"10px"}}>
                <Switch ref={(checkedChildren) => { this.checkedChildren = checkedChildren }} 
                        checkedChildren={<Icon type="CheckSubCodeFlag" />} 
                        unCheckedChildren={<Icon type="close" />} 
                        onChange={this.handleChange} 
                        disabled={this.disabled}
                        checked={this.state.checked}/>
            </span>
        </span>
    }

    handleChange = (checkedChildren) => {
        if(checkedChildren){
            this.setState({ 
                value: "CheckSubCodeFlag",
                checked: true
            });
        } else {
            this.setState({ 
                value: "",
                checked: false
            });
        }
    }

    stockOut = () => {
        let self = this;
        if (this.getErrorCount() > 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
            return;
        }
        let checkSubCode = this.state.value;

        let orderTable = this.props.orderTable;
        let orders = orderTable.state.data;
        if (orders.length === 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectOneRow));
            return;
        }

        let materialLots = this.state.data;
        if (materialLots.length === 0 ) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));

        let requestObj = {
            documentLines : orders,
            materialLots : materialLots,
            checkSubCode: checkSubCode,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.onSearch();
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        WltStockOutManagerRequest.sendWltStockOutRequest(requestObj);
    }

    //三方销售
    threeSideShip = () => {
        debugger;
        let self = this;
        if (this.getErrorCount() > 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
            return;
        }
        let documentLine = this.props.orderTable.getSingleSelectedRow();
        if (!documentLine) {
            self.setState({ 
                loading: false
            });
            return;
        } else if(documentLine.reserved31 != 'ERP_SOA'){
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ChooseThreeSideShipOrderPlease));
            return;
        }

        let materialLots = this.state.data;
        if (materialLots.length === 0 ) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));

        let requestObj = {
            documentLine : documentLine,
            materialLots : materialLots,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.onSearch();
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        WltStockOutManagerRequest.sendWltThreeSideShipRequest(requestObj);
    }

    getErrorCount = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if(data.errorFlag){
                    count = count +1;
                }
            });
        }
        return count;
    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">颗数：{count}</Tag>
    }

    createWaferNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if(data.currentSubQty){
                    count = count + data.currentSubQty;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}: {count}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">箱数：{this.state.data.length}</Tag>
    }

    createErrorNumberStatistic = () => {
        return <Tag color="#D2480A">{I18NUtils.getClientMessage(i18NCode.ErrorNumber)}：{this.getErrorCount()}</Tag>
    }

    createStockOut = () => {
        return <Button key="stockOut" type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-excel" onClick={this.stockOut}>
                        发货
                    </Button>
    }

    createThreeSideShip = () => {
        return <Button key="threeSideShip" type="primary" style={styles.tableButton} loading={this.state.loading} icon="inbox" onClick={this.threeSideShip}>
                       {I18NUtils.getClientMessage(i18NCode.BtnThreeSideShip)}
                    </Button>
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
