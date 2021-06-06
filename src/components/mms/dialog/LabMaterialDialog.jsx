import LabMaterialManagerRequest from '@api/mms/lab-material-manager/LabMaterialManagerRequest';
import EntityDialog from '@components/framework/dialog/EntityDialog';

export default class LabMaterialDialog extends EntityDialog {
    static displayName = 'LabMaterialDialog';

    handleSave = () => {
        var self = this;
        let object = {
            LabMaterial: this.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.material);
                }
            }
        };
        LabMaterialManagerRequest.sendMergeRequest(object);
    }
}


