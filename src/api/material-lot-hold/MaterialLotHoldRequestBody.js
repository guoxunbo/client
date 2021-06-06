import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

export default class MaterialLotHoldRequestBody {

    materialLotActions;
    
    constructor(materialLotActions){
        this.materialLotActions = materialLotActions;
    }

    static buildHoldMaterialLot(waitHoldMLotAndAction){
        let materialLotActions = [];
        waitHoldMLotAndAction.forEach(waitHoldMLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setActionReason(waitHoldMLotAndAction.actionReason);
            materialLotAction.setActionComment(waitHoldMLotAndAction.actionComment);
            materialLotAction.setMaterialLotId(waitHoldMLot.materialLotId);
            materialLotActions.push(materialLotAction); 
        });
        return new MaterialLotHoldRequestBody(materialLotActions);
    }
    
}