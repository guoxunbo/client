import EntityDialog from '@components/framework/dialog/EntityDialog';
import MessageRequest from '@api/message-manager/MessageRequest';

export default class MessageDialog extends EntityDialog {

    static displayName = 'MessageDialog';

    handleSave = (formObject) => {
        var self = this;
        let object = {
            values: formObject,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.message);
                }
            }
        };
        MessageRequest.sendMergeRequest(object);
    }

}


