import EntityDialog from '@components/framework/dialog/EntityDialog';
import VcMaterialLotInventoryRequest from '@api/vc/material-lot-inventory-manager/VcMaterialLotInventoryRequest';

/**
 * 接收/退料 备品备件
 */
export default class ReceiveSpareMaterialDialog extends EntityDialog {
    static displayName = 'ReceiveSpareMaterialDialog';

    handleSave = () => {
        var self = this;
        let object = {
            formObject: this.props.object,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.material);
                }
            }
        };

        let receiveFlag = this.props.receiveFlag;
        if(receiveFlag){
            VcMaterialLotInventoryRequest.sendCreateSpareMaterialLotRequest(object);
        }else{
            VcMaterialLotInventoryRequest.sendReturnSpareMaterialLotRequest(object);
        }
    }
}


