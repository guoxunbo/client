import MaterialLotAction from "../../dto/mms/MaterialLotAction";
export default class IraPackageRequestBody{
    materialLotActions;
    packageType;

    constructor(materialLotActions, packageType) {
        this.materialLotActions = materialLotActions;
        this.packageType = packageType;
    }
    
    static buildPackMaterialLots(materialLots, packageType, actionCode, actionReason, actionComment) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId)
            materialLotAction.setTransQty(materialLot.currentQty);
            materialLotAction.setActionCode(actionCode);
            materialLotAction.setActionReason(actionReason);
            materialLotAction.setActionComment(actionComment);
            materialLotActions.push(materialLotAction);
        });
        return new IraPackageRequestBody(materialLotActions, packageType);
    }
}