import EntityDialog from '@components/framework/dialog/EntityDialog';
import ProductManagerRequest from '@api/product-material-manager/ProductManagerRequest';

export default class ProductDialog extends EntityDialog {
    static displayName = 'ProductDialog';

    handleSave = () => {
        var self = this;
        let object = {
            product: this.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.material);
                }
            }
        };
        ProductManagerRequest.sendMergeRequest(object);
    }
}


