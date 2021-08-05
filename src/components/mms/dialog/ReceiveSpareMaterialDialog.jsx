import EntityDialog from '@components/framework/dialog/EntityDialog';
import VcMaterialLotInventoryRequest from '@api/vc/material-lot-inventory-manager/VcMaterialLotInventoryRequest';

/**
 * 接收/退料 备品备件
 */
const PartsMaterialAction = {
    Create:"Create",
    Return:"Return",
    Scrap:"Scrap"
}
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
        let action = this.props.partMaterialAction;
        if(PartsMaterialAction.Create == action){

            VcMaterialLotInventoryRequest.sendCreateSpareMaterialLotRequest(object);
        }else if(PartsMaterialAction.Return == action){

            VcMaterialLotInventoryRequest.sendReturnSpareMaterialLotRequest(object);
        }else if(PartsMaterialAction.Scrap == action){
            
            VcMaterialLotInventoryRequest.sendCreateSpareMaterialLotRequest(object);
        }
    }
}