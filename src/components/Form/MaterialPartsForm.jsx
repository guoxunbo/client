import EntityForm from './EntityForm';
import PartsMaterialManagerRequest from '../../api/gc/parts-material-manager/PartsMaterialManagerRequest';

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
        PartsMaterialManagerRequest.sendMergePartsRequest(object);
    }
}


