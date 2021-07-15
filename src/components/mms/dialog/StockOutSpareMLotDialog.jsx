import EntityDialog from '@components/framework/dialog/EntityDialog';
import VcMaterialLotInventoryRequest from '@api/vc/material-lot-inventory-manager/VcMaterialLotInventoryRequest';

export default class StockOutSpareMLotDialog extends EntityDialog {
    static displayName = 'StockOutSpareMLotDialog';

    handleSave = () => {
        var self = this;
        let formObject = self.props.object;
        let object = {
            formObject: formObject,
            success: function(responseBody) {
                if (self.props.onOk) {
                    formObject.unHandledQty = formObject.unHandledQty - formObject.transQty;
                    formObject.handledQty = formObject.handledQty + formObject.transQty;
                    self.props.onOk(formObject);
                }
            }
        };
        VcMaterialLotInventoryRequest.sendStockOutSpareMLotRequest(object);
    }
}


