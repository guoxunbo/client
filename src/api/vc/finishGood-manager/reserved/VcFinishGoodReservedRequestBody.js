import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

const actionType = {
    GetMaterialLot : "GetMaterialLot",
    GetReservedMLotByStandardQty : "GetReservedMLotByStandardQty",
    FinishGoodReserved : "FinishGoodReserved",
    FinishGoodUnReserved : "FinishGoodUnReserved",
    PrintReservedOrder: "PrintReservedOrder",
}

export default class VcFinishGoodReservedRequestBody {

    actionType;
    documentLine;
    materialLotAction;
    standardQty;
  
    constructor(actionType, documentLine, materialLotActionList, standardQty) {
        this.actionType = actionType;
        this.documentLine = documentLine;
        this.materialLotActionList = materialLotActionList;
        this.standardQty = standardQty;
    }

    static buildGetMaterialLot(documentLine) {
        return new VcFinishGoodReservedRequestBody(actionType.GetMaterialLot, documentLine);
    }

    static buildGetReservedMLotByStandardQty(documentLine, standardQty) {
        return new VcFinishGoodReservedRequestBody(actionType.GetReservedMLotByStandardQty, documentLine, undefined, standardQty);
    }

    
    static buildReserved(documentLine, materialLotList, remake) {
        let materialLotActionList = [];
        materialLotList.forEach(mLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(mLot.materialLotId);
            materialLotAction.setTransQty(mLot.currentQty);
            materialLotAction.setActionComment(remake);
            materialLotActionList.push(materialLotAction);
        });
        return new VcFinishGoodReservedRequestBody(actionType.FinishGoodReserved, documentLine, materialLotActionList);
    }

    static buildPrintReservedOrder(documentLine){
        return new VcFinishGoodReservedRequestBody(actionType.PrintReservedOrder, documentLine);
    }

    static buildUnReserved(materialLotList){
        let materialLotActionList = [];
        materialLotList.forEach(mLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(mLot.materialLotId);
            materialLotAction.setTransQty(mLot.currentQty);
            materialLotActionList.push(materialLotAction);
        });
        return new VcFinishGoodReservedRequestBody(actionType.FinishGoodUnReserved, undefined, materialLotActionList);
    }
}