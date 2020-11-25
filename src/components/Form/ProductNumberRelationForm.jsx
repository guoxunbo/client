import EntityForm from './EntityForm';
import ProductRelationRequest from '../../api/gc/product-relation/ProductRelationRequest';


export default class ProductNumberRelationForm extends EntityForm {
    static displayName = 'ProductNumberRelationForm';

    handleSave = () => {
        var self = this;
        let productNumberRelation = this.props.object;
        let object = {
            productNumberRelation: productNumberRelation,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk();
                }
            }
        };
        ProductRelationRequest.sendMergeRequest(object);
    }
}


