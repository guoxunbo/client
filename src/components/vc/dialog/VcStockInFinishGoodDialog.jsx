import EntityDialog from '@components/framework/dialog/EntityDialog';
import MaterialLotAction from '@api/dto/mms/MaterialLotAction';
import PropertyUtils from '@api/utils/PropertyUtils';
import VcStockInRequest from '@api/vc/finishGood-manager/stockIn/VcStockInRequest';

const ActionType = {
    StockIn: "StockIn",
}

/**
 *成品入库
 */
export default class VcStockInFinishGoodDialog extends EntityDialog {

    static displayName = 'VcStockInFinishGoodDialog';

    handleSave = (formObject) => {
        var self = this;
        let materialLotActionList = [];
       
        let materialLots = this.props.object;
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            PropertyUtils.copyProperties(formObject, materialLotAction);
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotAction.setTransQty(materialLot.currentQty);
            materialLotActionList.push(materialLotAction);
        });
        if (ActionType.StockIn === this.props.action) {
            let object = {
                materialLots: this.props.object, 
                materialLotActionList: materialLotActionList,
                success: function(responseBody) {
                    if (self.props.onOk) {
                        self.props.onOk(responseBody.materialLots);
                    }
                }
            };
            VcStockInRequest.sendStockInRequest(object);
        }
    }
}
export {ActionType};


