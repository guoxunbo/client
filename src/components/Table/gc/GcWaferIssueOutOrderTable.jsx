import EntityScanViewTable from '../EntityScanViewTable';
import { Button, Switch } from 'antd';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Tag } from 'antd';
import EventUtils from '../../../api/utils/EventUtils';
import WaferManagerRequest from '../../../api/gc/wafer-manager-manager/WaferManagerRequest';

/**
 * 无订单晶圆发料
 */
export default class GcWaferIssueOutOrderTable extends EntityScanViewTable {

    static displayName = 'GcWaferIssueOutOrderTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
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
        buttons.push(this.createWaferIssue());
        return buttons;
    }

    createTagGroup = () => {
        let tagList = [];
        tagList.push(this.createMaterialLotsNumber());
        tagList.push(this.createWaferCount());
        tagList.push(this.createTotalNumber());
        tagList.push(this.createErrorNumberStatistic());
        return tagList;
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

    createErrorNumberStatistic = () => {
        return <Tag color="#D2480A">{I18NUtils.getClientMessage(i18NCode.ErrorNumber)}：{this.getErrorCount()}</Tag>
    }

    createMaterialLotsNumber = () => {
        let materialLotUnits = this.state.data;
        let materialLotIdList = [];
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (materialLotIdList.indexOf(data.materialLotId) == -1) {
                    materialLotIdList.push(data.materialLotId);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{materialLotIdList.length}</Tag>
    }

    createWaferCount = () => {
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
        let materialLotUnits = this.state.data;
        let count = 0;
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (data.currentQty != undefined) {
                    count = count + data.currentQty;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalNumber)}:{count}</Tag>
    }

    waferIssue = () => {
        let self = this;
        if (this.getErrorCount() > 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
            return;
        }
        
        let materialLots = this.state.data;
        if (materialLots.length === 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let requestObject = {
            materialLots : materialLots,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        WaferManagerRequest.sendWaferOutOrderIssueRequest(requestObject);
    }

    createWaferIssue = () => {
        return <Button key="issue" type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-excel" onClick={this.waferIssue}>
                        {I18NUtils.getClientMessage(i18NCode.BtnIssue)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
