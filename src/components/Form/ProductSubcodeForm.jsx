import EntityForm from './EntityForm';
import ProductSubcodeManagerRequest from '../../api/gc/product-subcode-manager/ProductSubcodeManagerRequest';

export default class ProductSubcodeForm extends EntityForm {
    static displayName = 'ProductSubcodeForm';

    handleSave = () => {
        var self = this;
        let object = {
            productSubcode: this.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.productSubcode);
                }
            }
        };
        ProductSubcodeManagerRequest.sendMergeRequest(object);
    }
}


