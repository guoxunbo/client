import ReturnLotOrderRequest from '@api/return-material-manager/ReturnLotOrderRequest';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import ReturnMLotOrderScanTable from './ReturnMLotOrderScanTable';

/**
 * RMA退货
 * 客户退回
 */
export default class ReturnLotOrderScanTable extends ReturnMLotOrderScanTable {

    static displayName = 'ReturnLotOrderScanTable';


    ReturnMLot = () => {
        let self = this;
        let materialLots = this.getScanned();
        let doc = this.props.orderTable.getSingleSelectedRow();
        if (materialLots.length === 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let requestObject = {
            materialLots: materialLots,
            documentId:  doc.name,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.setState({
                        loading: false
                    });
                    self.props.resetData();
                }
                NoticeUtils.showSuccess();
            }
        }
        ReturnLotOrderRequest.sendReturnGoodsRequest(requestObject);
    }
}
