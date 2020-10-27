import EntityScanViewTable from '../EntityScanViewTable';
import { Button } from 'antd';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Tag } from 'antd';
import EventUtils from '../../../api/utils/EventUtils';
import FtMLotManagerRequest from '../../../api/gc/ft-materialLot-manager/FtMLotManagerRequest';

export default class GcFTWaferIssueTable extends EntityScanViewTable {

    static displayName = 'GcFTWaferIssueTable';

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

    createWaferCount = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{this.state.data.length}</Tag>
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
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    ftUnitIssue = () => {
        let self = this;
        if (this.getErrorCount() > 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
            return;
        }
        let orderTable = this.props.orderTable;
        let orders = orderTable.state.data;
        if (orders.length === 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectOneRow));
            return;
        }
        
        let materialLotUnits = this.state.data;
        if (materialLotUnits.length === 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        let requestObject = {
            documentLines : orders,
            materialLotUnitList : materialLotUnits,
            issueWithDoc: "issueWithDoc",
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                    self.props.onSearch();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        FtMLotManagerRequest.sendUnitIssueRequest(requestObject);
    }

    createWaferIssue = () => {
        return <Button key="issue" type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-excel" onClick={this.ftUnitIssue}>
                        发料
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
