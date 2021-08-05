import EntityDialog from '@components/framework/dialog/EntityDialog';
import MaterialLotManagerRequest from '@api/material-lot-manager/MaterialLotManagerRequest';

/**
 * 箱标签重复打印的弹框
 */
export default class PrintBoxMLotDialog extends EntityDialog {

    static displayName = 'PrintBoxMLotDialog';

    handleSave = () => {
        var self = this;
        let requestObject = {
            materialLotAction: self.props.object,
            validationPrintFlag: self.props.validationPrintFlag,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk();
                }
            }
        }
        MaterialLotManagerRequest.sendPrintMaterialLotRequest(requestObject);
    }
}


