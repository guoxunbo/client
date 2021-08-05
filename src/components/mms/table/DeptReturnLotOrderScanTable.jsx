import ReturnLotOrderRequest from '@api/return-material-manager/ReturnLotOrderRequest';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import ReturnMLotOrderScanTable from './ReturnMLotOrderScanTable';

/**
 * 部门退料
 */
export default class DeptReturnLotOrderScanTable extends ReturnMLotOrderScanTable {

    static displayName = 'DeptReturnLotOrderScanTable';

    ReturnMLot = () => {
        let self = this;
        let materialLots = this.getScanned();
        let doc = this.props.orderTable.getSingleSelectedRow();
        if(!doc){
            return;
        }
        if (materialLots.length === 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        self.setState({
            loading: true
        });
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
        ReturnLotOrderRequest.sendDeptReturnMLotRequest(requestObject);
    }
}
