import EntityDialog from '@components/framework/dialog/EntityDialog';
import ParameterRequest from '@api/parameter-manager/ParameterRequest';

export default class ParameterDialog extends EntityDialog {

    static displayName = 'ParameterDialog';

    handleSave = (formObject) => {
        var self = this;
        let object = {
            values: formObject,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.parameter);
                }
            }
        };
        ParameterRequest.sendMergeRequest(object);
    }

}


