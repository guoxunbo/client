import EntityDialog from '@components/framework/dialog/EntityDialog';
import IssueOrderRequest from '@api/issue-order-manager/issue-lot-order/IssueOrderRequest';
/**
 * 弹出框
 */
export default class CreateIssueOrderDialog extends EntityDialog {
    static displayName = 'CreateIssueOrderDialog';

    handleSave = () => {
        var self = this;
        let object = {
            materialLots : self.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.document);  
                }
            }
        }
        IssueOrderRequest.sendCreateIssueMLotOrderRequest(object);
        }

}

 
