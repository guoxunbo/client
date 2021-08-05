import EntityDialog from '@components/framework/dialog/EntityDialog';
import MaterialLotManagerRequest from '@api/material-lot-manager/MaterialLotManagerRequest';

export default class PrintMLotDialog extends EntityDialog {

    static displayName = 'PrintMLotDialog';

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


