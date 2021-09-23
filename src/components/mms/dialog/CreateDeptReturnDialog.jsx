import EntityDialog from '@components/framework/dialog/EntityDialog';
import ReturnLotOrderRequest from '@api/return-material-manager/ReturnLotOrderRequest';

/**
 * 弹出框
 */
export default class CreateDeptReturnDialog extends EntityDialog {
    static displayName = 'CreateDeptReturnDialog';
 
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
        ReturnLotOrderRequest.sendCreateDeptReturnOrderRequest(object);
    }

}

 
