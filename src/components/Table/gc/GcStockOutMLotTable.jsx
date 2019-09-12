
import EntityScanViewTable from '../EntityScanViewTable';
import { Button } from 'antd';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import StockOutManagerRequest from '../../../api/gc/stock-out/StockOutManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';

/**
 * 重测发料的物料批次表格
 */
export default class GcStockOutMLotTable extends EntityScanViewTable {

    static displayName = 'GcStockOutMLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createReTest());
        return buttons;
    }

    stockOut = () => {
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
            }
        }
        StockOutManagerRequest.sendStockOutRequest(requestObject)
    }

    createReTest = () => {
        return <Button key="stockOut" type="primary" style={styles.tableButton} icon="file-excel" onClick={this.stockOut}>
                        发货
                    </Button>
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
