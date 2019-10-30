
import EntityScanViewTable from '../EntityScanViewTable';
import { Button } from 'antd';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import RetestManagerRequest from '../../../api/gc/retest-manager/RetestManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Tag } from 'antd';

/**
 * 重测发料的物料批次表格
 */
export default class GcReTestMLotTable extends EntityScanViewTable {

    static displayName = 'GcReTestMLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createTotalNumber());
        buttons.push(this.createReTest());
        return buttons;
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

    createStatistic = () => {
        return <Tag color="#2db7f5">包数：{this.state.data.length}</Tag>
    }

    reTest = () => {
        let self = this;
        let orderTabel = this.props.orderTable;
        let order = orderTabel.getSingleSelectedRow();
        if (!order) {
            return;
        }
        let materialLots = this.state.data;
        if (materialLots.length === 0 ) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let requestObject = {
            documentLine : order,
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
        return <Button key="reTest" type="primary" style={styles.tableButton} icon="file-excel" onClick={this.reTest}>
                        发料
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
