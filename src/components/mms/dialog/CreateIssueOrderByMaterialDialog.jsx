import EntityDialog from '@components/framework/dialog/EntityDialog';
import IssueOrderByMaterialRequest from '@api/issue-order-manager/issue-order-by-material/IssueOrderByMaterialRequest';

/**
 * 弹出框
 */
export default class CreateIssueOrderByMaterialDialog extends EntityDialog {
    static displayName = 'CreateIssueOrderByMaterialDialog';

    handleSave = () => {
        var self = this;
        let object = {
            materials : self.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.document);  
                }
            }
        }
        
        IssueOrderByMaterialRequest.sendCreateIssueOrderByMaterialRequest(object);
    }

}

 
