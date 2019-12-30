import RefListManagerRequest from '@api/ref-list-manager/RefListManagerRequest';
import Combox from './Combox';

export default class LanguageField extends Combox {

    static displayName = 'LanguageField';

    constructor(props) {
        super(props);
    }

    queryData = () => {
        let self = this;
        let object = {
            success: function(responseBody) {
                self.setState({
                    data: responseBody.dataList,
                });
            }
        }
        RefListManagerRequest.sendGetLanguageRequest(object);
    }
}