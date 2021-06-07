import EntityDialog from '@components/framework/dialog/EntityDialog';
import SpareMaterialManagerRequest from '@api/spare-material-manager/SpareMaterialManagerRequest';

export default class SpareMaterialDialog extends EntityDialog {
    static displayName = 'SpareMaterialDialog';

    handleSave = () => {
        var self = this;
        let object = {
            spareMaterial: this.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.dataList);
                }
            }
        };
        SpareMaterialManagerRequest.sendMergeRequest(object);
    }
}


