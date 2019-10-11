import EntityDialog from '@components/framework/dialog/EntityDialog';
import MaterialLotManagerRequest from '@api/material-lot-manager/MaterialLotManagerRequest';

export default class MaterialLotActionForm extends EntityDialog {

    static displayName = 'MaterialLotActionForm';

    handleSave = () => {
        var self = this;
        let object = {
            action: this.props.action,
            materialLot: this.props.object.materialLot, 
            materialLotAction: this.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.materialLot);
                }
            }
        };
        MaterialLotManagerRequest.sendMaterialLotActionRequest(object);
    }
}


