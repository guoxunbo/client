import MaterialLotIqcRequest from '@api/mms/material-lot-iqc/MaterialLotIqcRequest';
import EntityDialog from '@components/framework/dialog/EntityDialog';

/**
 * MaterialLot做QC（Quality Control）的弹出框
 */
export default class MaterialLotQcDialog extends EntityDialog {
    static displayName = 'MaterialLotQcDialog';

    handleSave = () => {
        var self = this;
        let object = {
            materialCheckSheet : self.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.materialLotCheckSheet);
                }
            }
        }
        MaterialLotIqcRequest.sendIqcRequest(object);
    }
}

 
