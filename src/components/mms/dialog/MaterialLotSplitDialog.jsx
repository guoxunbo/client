import MaterialLotSplitRequest from '@api/material-lot-split/MaterialLotSplitRequest';
import EntityDialog from '@components/framework/dialog/EntityDialog';

/**
 * MaterialLot做 分批 的弹出框
 */
export default class MaterialLotSplitDialog extends EntityDialog {
    static displayName = 'MaterialLotSplitDialog';

    handleSave = () => {
        var self = this;
        let object = {
            waitSplitMLotAndAction : self.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk();
                }
            }
        }
        MaterialLotSplitRequest.sendSplitMaterialLot(object);
    }
}

 
