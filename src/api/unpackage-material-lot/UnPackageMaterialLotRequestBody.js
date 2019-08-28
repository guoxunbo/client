import MaterialLotAction from "../dto/mms/MaterialLotAction";

export default class UnPackageMaterialLotRequestBody {
    materialLotActions;

    constructor(materialLotActions) {
        this.materialLotActions = materialLotActions;
    }
    
    static buildUnPackMaterialLot(packedLotDetails, actionCode, actionReason, actionComment) {
        let materialLotActions = [];
        packedLotDetails.forEach(packedLotDetail => {
            let existActon = materialLotActions.find(action => action.materialLotId === packedLotDetail.packagedLotId);
            if (!existActon) {
                let materialLotAction = new MaterialLotAction();
                materialLotAction.setMaterialLotId(packedLotDetail.packagedLotId);
                materialLotAction.setActionCode(actionCode);
                materialLotAction.setActionReason(actionReason);
                materialLotAction.setActionComment(actionComment);
                materialLotActions.push(materialLotAction);
            }
        });
        return new UnPackageMaterialLotRequestBody(materialLotActions);
    }

}