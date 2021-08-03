import MaterialLotHoldRequest from '@api/material-lot-hold/MaterialLotHoldRequest';
import EntityDialog from '@components/framework/dialog/EntityDialog';

/**
 * MaterialLot  HOLD的弹出框
 */
export default class MaterialLotHoldDialog extends EntityDialog {
    static displayName = 'MaterialLotHoldDialog';

    handleSave = () => {
        var self = this;
        let object = {
            waitHoldMLotAndAction : self.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk();
                }
            }
        }
        MaterialLotHoldRequest.sendHoldMLot(object);
    }
}

 
