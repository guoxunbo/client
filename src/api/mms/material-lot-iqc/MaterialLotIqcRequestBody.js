import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

const ActionType = {
    ValidationAndGetMLot:'ValidationAndGetWaitIqcMLot',
    BatchIqc:'BatchIqc',
}
export default class MaterialLotIqcRequestBody {

    actionType;
    materialLotIds;
    materialLotAction;

    constructor(materialLotAction, materialLotIds, materialLotActions) {
        this.materialLotAction = materialLotAction;
        this.materialLotIds = materialLotIds;
        this.materialLotActions = materialLotActions;
    }
    
    setActionType(actionType){
        this.actionType = actionType;
    }

    static buildIqc(materialLotCheckSheet) {
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(materialLotCheckSheet.materialLotId);
        materialLotAction.setActionCode(materialLotCheckSheet.actionCode);
        materialLotAction.setActionReason(materialLotCheckSheet.actionReason);
        materialLotAction.setActionComment(materialLotCheckSheet.actionComment);
        materialLotAction.setTransQty(materialLotCheckSheet.transQty);
        return new MaterialLotIqcRequestBody(materialLotAction);
    }

    /**
     * 验证并且获得待IQC物料
     * @param {*} materialLots 
     * @returns 
     */
    static buildValidationAndGetWaitIqcMLot(materialLots) {
        let materialLotIds = [];
        materialLots.forEach(data => {
            materialLotIds.push(data.materialLotId);
        });
        let materialLotIqcRequestBody =  new MaterialLotIqcRequestBody(undefined, materialLotIds);
        materialLotIqcRequestBody.setActionType(ActionType.ValidationAndGetMLot);
        return materialLotIqcRequestBody;
    }

    
    static buildBatchIqc(judgeMLotsAndAction) {
        let materialLotActions = [];
        judgeMLotsAndAction.forEach(data => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(data.materialLotId);
            materialLotAction.setActionCode(judgeMLotsAndAction.actionCode);
            materialLotAction.setActionReason(judgeMLotsAndAction.actionReason);
            materialLotAction.setActionComment(judgeMLotsAndAction.actionComment);
            materialLotActions.push(materialLotAction);
        });
        
        let materialLotIqcRequestBody =  new MaterialLotIqcRequestBody(undefined, undefined, materialLotActions);
        materialLotIqcRequestBody.setActionType(ActionType.BatchIqc);
        return materialLotIqcRequestBody;
    }
}