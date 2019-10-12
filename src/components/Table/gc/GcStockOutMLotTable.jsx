
import EntityScanViewTable from '../EntityScanViewTable';
import { Button, Tag } from 'antd';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import StockOutManagerRequest from '../../../api/gc/stock-out/StockOutManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';
import ValidationSoOrTestRequest from '../../../api/gc/validation-so-test/ValidationSoOrTestRequest';

/**
 * 重测发料的物料批次表格
 */
export default class GcStockOutMLotTable extends EntityScanViewTable {

    static displayName = 'GcStockOutMLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createStockOut());
        return buttons;
    }

    stockOut = () => {
        let self = this;
        let documentLine = this.props.orderTable.getSingleSelectedRow();
        if (!documentLine) {
            self.setState({ 
                loading: false
            });
            return;
        }
        let materialLots = this.state.data;
        if (materialLots.length === 0 ) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }

        let materialLot = materialLots[0];
        self.validationRule(documentLine, materialLot, materialLots);
    }

    /*
    *  gc要求出货时验证出库单与物料的产品信息是否符符合要求
    */
    validationRule = (documentLine, materialLot, materialLots) => {
        let self = this;
        let requestObject = {
          documentLine : documentLine,
          materialLot : materialLot,
          success: function(responseBody) {
            let requestObj = {
                documentLine : documentLine,
                materialLots : materialLots,
                success: function(responseBody) {
                    if (self.props.resetData) {
                        self.props.resetData();
                    }
                    MessageUtils.showOperationSuccess();
                }
            }
            StockOutManagerRequest.sendStockOutRequest(requestObj)
          }
        }
        ValidationSoOrTestRequest.sendValidationRequest(requestObject);
      }

    createStatistic = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">{count}</Tag>
    }

    createStockOut = () => {
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
