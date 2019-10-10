import EntityForm from "@components/framework/form/EntityForm";
import MaterialLotManagerRequest from "@api/gc/material-lot-manager/MaterialLotManagerRequest";

export default class PackRelayBoxForm extends EntityForm {
    static displayName = 'PackRelayBoxForm';

    handleSave = (formObject) => {
        var self = this;
        let materialLots = this.props.object;
        let object = {
            materialLots : materialLots,
            relayBoxId: formObject.relayBoxId,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk();
                }
            }
        }
        MaterialLotManagerRequest.sendBindRelaxBoxRequest(object);
    }

}


