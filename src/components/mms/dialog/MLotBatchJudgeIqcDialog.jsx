import MaterialLotIqcRequest from '@api/mms/material-lot-iqc/MaterialLotIqcRequest';
import EntityDialog from '@components/framework/dialog/EntityDialog';

/**
 * 批量判定IQC的弹框
 */
export default class MLotBatchJudgeIqcDialog extends EntityDialog {
    static displayName = 'MLotBatchJudgeIqcDialog';

    handleSave = () => {
        var self = this;
        let object = {
            judgeMLotAndAction : self.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk();
                }
            }
        }

        MaterialLotIqcRequest.sendBatchIqcRequest(object);
    }
}

 
