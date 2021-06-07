import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

const actionType ={ 
    PackageMLot: "PackageMLot",
    PrintPackageMLot: "PrintPackageMLot",
}
export default class PackageMaterialLotRequestBody {

    materialLotActions;
    packageType;
    materialLotId;

    constructor(actionType, materialLotActions, packageType, materialLotId) {
        this.actionType = actionType;
        this.materialLotActions = materialLotActions;
        this.packageType = packageType;
        this.materialLotId = materialLotId;
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
        return new PackageMaterialLotRequestBody(actionType.PackageMLot, materialLotActions, packageType);
    }

    static buildPrintPackageMLot(materialLotId) {
        return new PackageMaterialLotRequestBody(actionType.PrintPackageMLot, undefined, undefined, materialLotId);
    }
}