import StorageManagerRequest from '@api/vc/storage-manager/StorageManagerRequest';
import EntityDialog from '@components/framework/dialog/EntityDialog';

/**
 * 库位管理的弹框
 */
export default class StorageDialog extends EntityDialog {

    static displayName = 'StorageDialog';

    handleSave = () => {
        var self = this;
        let storage = self.props.object;
        let object = {
            storage: storage,
            success: function(responseBody) {
                self.props.onOk(responseBody.storage);
            }
        }
        StorageManagerRequest.sendSaveStorageInfo(object);
    }
}

 
