import EntityDialog from '@components/framework/dialog/EntityDialog';
import MaterialLotManagerRequest from '@api/material-lot-manager/MaterialLotManagerRequest';

/**
 * 接收备品备件
 */
export default class ReceiveSpareMaterialDialog extends EntityDialog {
    static displayName = 'ReceiveSpareMaterialDialog';

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
        MaterialLotManagerRequest.sendReceiveSpareMaterialLotRequest(object);
    }
}


