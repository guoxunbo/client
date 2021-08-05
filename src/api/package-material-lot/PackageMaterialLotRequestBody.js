import MaterialLotAction from "@api/dto/mms/MaterialLotAction";
import PropertyUtils from "@utils/PropertyUtils";

const actionType ={ 
    PackageMLot: "PackageMLot",
    PrintPackageMLot: "PrintPackageMLot",
    PrintRYBoxMLot: "PrintRYBoxMLot",
}
export default class PackageMaterialLotRequestBody {

    actionType;
    materialLotActions;
    packageType;
    materialLotId;
    validationPrintFlag

    setValidationPrintFlag(validationPrintFlag){
        this.validationPrintFlag = validationPrintFlag;
    }

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

    static buildPrintPackageMLot(materialLotId, materialLotAction, validationPrintFlag) {
        let materialLotActions = [];
        let action = new MaterialLotAction();
        PropertyUtils.copyProperties(materialLotAction, action)
        materialLotActions.push(action);

        let packageMaterialLotRequestBody = new PackageMaterialLotRequestBody(actionType.PrintPackageMLot, materialLotActions, undefined, materialLotId);
        packageMaterialLotRequestBody.setValidationPrintFlag(validationPrintFlag);
        return packageMaterialLotRequestBody;
    }

    static buildPrintRYBoxMLot(materialLotId, materialLotAction, validationPrintFlag) {
        let materialLotActions = [];
        let action = new MaterialLotAction();
        PropertyUtils.copyProperties(materialLotAction, action)
        materialLotActions.push(action);

        let packageMaterialLotRequestBody = new PackageMaterialLotRequestBody(actionType.PrintRYBoxMLot, materialLotActions, undefined, materialLotId);
        packageMaterialLotRequestBody.setValidationPrintFlag(validationPrintFlag);
        return packageMaterialLotRequestBody;
    }
}