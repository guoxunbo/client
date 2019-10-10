import MaterialLotAction from "@api/dto/mms/MaterialLotAction";
import MaterialLot from "@api/dto/mms/MaterialLot";

export default class AppendPackageMaterialLotRequestBody {
    packedMaterialLot;
    waitToAppendActions;

    constructor(packedMaterialLot, waitToAppendActions) {
        this.packedMaterialLot = packedMaterialLot;
        this.waitToAppendActions = waitToAppendActions;
    }
    
    static buildAppendPackMaterialLots(packedMaterialLotId, waitToPackMaterialLots, actionCode, actionReason, actionComment) {

        let packedMaterialLot = new MaterialLot();
        packedMaterialLot.setMaterialLotId(packedMaterialLotId);

        let waitToPackageActions = [];
        waitToPackMaterialLots.forEach((waitToPackMaterialLot) => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(waitToPackMaterialLot.materialLotId);
            materialLotAction.setTransQty(waitToPackMaterialLot.currentQty);
            materialLotAction.setActionCode(actionCode);
            materialLotAction.setActionReason(actionReason);
            materialLotAction.setActionComment(actionComment);
            waitToPackageActions.push(materialLotAction);
        });
        return new AppendPackageMaterialLotRequestBody(packedMaterialLot, waitToPackageActions);
    }

}