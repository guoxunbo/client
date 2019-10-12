import EntityDialog from '@components/framework/dialog/EntityDialog';
import RawMaterialManagerRequest from '@api/raw-material-manager/RawMaterialManagerRequest';

export default class MaterialDialog extends EntityDialog {
    static displayName = 'MaterialDialog';

    handleSave = () => {
        var self = this;
        let object = {
            rawMaterial: this.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.material);
                }
            }
        };
        RawMaterialManagerRequest.sendMergeRequest(object);
    }
}


