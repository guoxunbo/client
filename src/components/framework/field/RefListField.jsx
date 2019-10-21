import RefListManagerRequest from '@api/ref-list-manager/RefListManagerRequest';
import Combox from './Combox';

import * as PropTypes from 'prop-types';

export default class RefListField extends Combox {

    static displayName = 'RefListField';

    constructor(props) {
        super(props);
    }

    queryData = () => {
        let self = this;
        let object = {
            owner:this.props.owner,
            referenceName: this.props.referenceName,
            success: function(responseBody) {
                self.setState({
                    data: responseBody.dataList,
                });
            }
        }
        RefListManagerRequest.sendGetDataRequest(object);
    }
}

RefListField.prototypes = {
    owner: PropTypes.bool,
    referenceName: PropTypes.string.isRequired
}