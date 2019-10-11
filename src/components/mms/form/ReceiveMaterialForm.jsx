import EntityDialog from '@components/framework/dialog/EntityDialog';
import MaterialLotManagerRequest from '@api/material-lot-manager/MaterialLotManagerRequest';

export default class ReceiveMaterialForm extends EntityDialog {
    static displayName = 'ReceiveMaterialForm';

    handleSave = () => {
        var self = this;
        let object = {
            formObject: this.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.material);
                }
            }
        };
        MaterialLotManagerRequest.sendReceiveMaterialLotRequest(object);
    }
}


