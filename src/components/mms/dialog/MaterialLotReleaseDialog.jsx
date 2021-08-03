import MaterialLotReleaseRequest from '@api/material-lot-release/MaterialLotReleaseRequest';
import EntityDialog from '@components/framework/dialog/EntityDialog';

/**
 * MaterialLot做release的弹出框
 */
export default class MaterialLotReleaseDialog extends EntityDialog {
    static displayName = 'MaterialLotReleaseDialog';

    handleSave = () => {
        var self = this;
        let object = {
            waitReleaseMLotAndAction : self.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk();
                }
            }
        }
        MaterialLotReleaseRequest.sendReleaseMLot(object);
    }
}

 
