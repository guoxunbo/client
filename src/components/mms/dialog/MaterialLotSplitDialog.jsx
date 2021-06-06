import SplitMLotRequest from '@api/material-lot-split/SplitMLotRequest';
import EntityDialog from '@components/framework/dialog/EntityDialog';

export default class MaterialLotSplitDialog extends EntityDialog {
    static displayName = 'MaterialLotSplitDialog';

    handleSave = () => {
        var self = this;
        let object = {
            spiltAction: this.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.materialLot);
                }
            }
        };
        SplitMLotRequest.sendSplitMLotRequest(object);
    }
}


