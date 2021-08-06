import MaterialLotIqcRequest from '@api/mms/material-lot-iqc/MaterialLotIqcRequest';
import EntityDialog from '@components/framework/dialog/EntityDialog';

/**
 * QC审核
 */
export default class QCApprovalDialog extends EntityDialog {
    static displayName = 'QCApprovalDialog';

    handleSave = () => {
        var self = this;
        let object = {
            actionObject: self.props.object,
            formObjectList: self.props.formObjectList,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk();
                }
            }
        }

        MaterialLotIqcRequest.sendIqcApprovalRequest(object);
    }
}

 
