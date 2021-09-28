import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

const actionType = {
    CheckMLot: "CheckMLot",
    CheckMLotByOrder:"CheckMLotByOrder",
    RecheckMLotByOrder:"RecheckMLotByOrder",
    GetReservedMLot: "GetReservedMLot",
    GetRecheckMLot: "GetRecheckMLot",
}
export default class CheckMLotRequestBody {

    actionType;
    documentLine;
    materialLotActionList
  
    constructor(actionType, documentLine, materialLotActionList){
        this.actionType = actionType;
        this.documentLine = documentLine;
        this.materialLotActionList = materialLotActionList;
    }
    
    static buildCheckMLot(materialLots) {
        let materialLotActionList = []
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotAction.setTransQty(materialLot.transQty);
            materialLotAction.setFromWarehouseRrn(materialLot.lastWarehouseRrn);
            materialLotAction.setFromStorageRrn(materialLot.lastStorageRrn);
            materialLotActionList.push(materialLotAction)
        });
        return new CheckMLotRequestBody(actionType.CheckMLot, undefined, materialLotActionList);
    }

    static buildCheckMLotByOrder(documentLine, materialLots) {
        let materialLotActionList = []
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotAction.setTransQty(materialLot.transQty);
            materialLotAction.setFromWarehouseRrn(materialLot.lastWarehouseRrn);
            materialLotAction.setFromStorageRrn(materialLot.lastStorageRrn);
            materialLotActionList.push(materialLotAction)
        });
        return new CheckMLotRequestBody(actionType.CheckMLotByOrder, documentLine, materialLotActionList);
    }

    static buildRecheckMLotByOrder(documentLine, materialLots) {
        let materialLotActionList = []
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotAction.setTransQty(materialLot.transQty);
            materialLotAction.setFromWarehouseRrn(materialLot.lastWarehouseRrn);
            materialLotAction.setFromStorageRrn(materialLot.lastStorageRrn);
            materialLotActionList.push(materialLotAction)
        });
        return new CheckMLotRequestBody(actionType.RecheckMLotByOrder, documentLine, materialLotActionList);
    }

    static buildGetReservedMLot(documentLine) {
        return new CheckMLotRequestBody(actionType.GetReservedMLot, documentLine);
    }

    static buildGetWaitRecheckMLot(documentLine) {
        return new CheckMLotRequestBody(actionType.GetRecheckMLot, documentLine);
    }
}