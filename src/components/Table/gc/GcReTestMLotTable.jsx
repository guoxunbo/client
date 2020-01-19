
import EntityScanViewTable from '../EntityScanViewTable';
import { Button } from 'antd';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import RetestManagerRequest from '../../../api/gc/retest-manager/RetestManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Tag } from 'antd';
import EventUtils from '../../../api/utils/EventUtils';

/**
 * 重测发料的物料批次表格
 */
export default class GcReTestMLotTable extends EntityScanViewTable {

    static displayName = 'GcReTestMLotTable';

    getRowClassName = (record, index) => {
        // 如果是扫描到不存在的批次，则进行高亮显示
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
        buttons.push(this.createStatistic());
        buttons.push(this.createTotalNumber());
        buttons.push(this.createErrorNumberStatistic());
        buttons.push(this.createReTest());
        return buttons;
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

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if (data.currentQty != undefined) {
                    count = count + data.currentQty;
                }
            });
        }
        return <Tag color="#2db7f5">颗数：{count}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">包数：{this.state.data.length}</Tag>
    }

    reTest = () => {
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
            documentLines : orders,
            materialLots : materialLots,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
                //重测发料完成后刷新页面
                window.location.reload(true);
            }
        }
        RetestManagerRequest.sendRetestRequest(requestObject);
    }

     /**
     * 发料
     */
    createReTest = () => {
        return <Button key="reTest" type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-excel" onClick={this.reTest}>
                        发料
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
