import EntityForm from './EntityForm';
import RawMaterialManagerRequest from '../../api/raw-material-manager/RawMaterialManagerRequest';

export default class MaterialPartsForm extends EntityForm {
    static displayName = 'MaterialPartsForm';

    handleSave = () => {
        var self = this;
        let object = {
            parts: this.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.parts);
                }
            }
        };
        RawMaterialManagerRequest.sendMergePartsRequest(object);
    }
}


