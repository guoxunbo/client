import MaterialLotOqcRequest from '@api/mms/material-lot-oqc/MaterialLotOqcRequest';
import EntityDialog from '@components/framework/dialog/EntityDialog';

export default class MaterialLotOQcDialog extends EntityDialog {
    static displayName = 'MaterialLotOQcDialog';

    handleSave = () => {
        var self = this;
        let object = {
            materialCheckSheet : self.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.materialLotCheckSheet);
                }
            }
        };
        MaterialLotOqcRequest.sendOqcRequest(object);
    }
}


