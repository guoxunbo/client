import EntityForm from './EntityForm';
import MaterialLotManagerRequest from '../../api/material-lot-manager/MaterialLotManagerRequest';

export default class ReceivePartsForm extends EntityForm {
    static displayName = 'ReceivePartsForm';

    handleSave = () => {
        var self = this;
        let object = {
            formObject: this.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.parts);
                }
            }
        };
        MaterialLotManagerRequest.sendReceivePartsRequest(object);
    }
}


