import EntityForm from '@components/framework/form/EntityForm';
import MaterialLotAction from '@api/dto/mms/MaterialLotAction';
import PropertyUtils from '@api/utils/PropertyUtils';
import MaterialLotStockInRequest from '@api/material-lot-stockIn/MaterialLotStockInRequest';

const ActionType = {
    StockIn: "StockIn",
}

/**
 * 物料批次批量处理
 */
export default class MutipleMaterialLotActionForm extends EntityForm {

    static displayName = 'MutipleMaterialLotActionForm';

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
            MaterialLotStockInRequest.sendStockInRequest(object);
        }
    }
}
export {ActionType};


