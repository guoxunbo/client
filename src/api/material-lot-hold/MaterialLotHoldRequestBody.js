import MaterialLotAction from "@api/dto/mms/MaterialLotAction";
import PropertyUtils from "@utils/PropertyUtils";

export default class MaterialLotHoldRequestBody {

    materialLotActions;
    
    constructor(materialLotActions){
        this.materialLotActions = materialLotActions;
    }

    static buildHoldMaterialLot(waitHoldMLotAndAction){
        let materialLotActions = [];
        waitHoldMLotAndAction.forEach(waitHoldMLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setActionCode(waitHoldMLotAndAction.actionCode);
            materialLotAction.setActionReason(waitHoldMLotAndAction.actionReason);
            materialLotAction.setActionComment(waitHoldMLotAndAction.actionComment);
            materialLotAction.setMaterialLotId(waitHoldMLot.materialLotId);
            materialLotActions.push(materialLotAction); 
        });
        return new MaterialLotHoldRequestBody(materialLotActions);
    }
    
}