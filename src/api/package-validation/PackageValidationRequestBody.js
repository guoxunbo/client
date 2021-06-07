
const ActionType = {
    ValidationPack: "ValidationPack",
    ValidationAppend: "ValidationAppend",
}

export default class PackageValidationRequestBody {
    actionType;
    packageType;
    waitToPackMaterialLots;
    packagedMaterialLotId;

    constructor(actionType, waitToPackMaterialLots, packageType) {
        this.actionType = actionType;
        this.waitToPackMaterialLots = waitToPackMaterialLots;
        this.packageType = packageType;
    }
    
    setPackagedMaterialLotId(packagedMaterialLotId) {
        this.packagedMaterialLotId = packagedMaterialLotId;
    }

    static buildValidationPackageBody(waitToPackMaterialLots, packageType) {
        return new PackageValidationRequestBody(ActionType.ValidationPack, waitToPackMaterialLots, packageType);
    }

    static buildValidationAppendBody(waitToPackMaterialLots, packagedMaterialLotId, packageType) {
        let requestBody =  new PackageValidationRequestBody(ActionType.ValidationAppend, waitToPackMaterialLots, packageType);
        requestBody.setPackagedMaterialLotId(packagedMaterialLotId);
        return requestBody;
    }

}