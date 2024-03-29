import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

const actionType ={ 
    ReturnLot: "ReturnMLot",
    GetMaterialLot: "GetMaterialLot",
    CreateReturnMaterialLotOrder: "CreateReturnMaterialLotOrder",
    ReturnMaterialLot: "ReturnMaterialLot",
    CreateReturnGoodsOrder:"CreateReturnGoodsOrder",
    ReturnGoods: "ReturnGoods",
    CreateDeptReturnOrder: "CreateDeptReturnOrder",
    DeptReturnMLot: "DeptReturnMLot",

}
export default class ReturnLotOrderRequestBody{

    actionType;
    documentId ;
    materialLotIdList;
    materialLotActionList;

    constructor(actionType, documentId, materialLotIdList, materialLotActionList, dataList){
        this.actionType =actionType;
        this.documentId = documentId;
        this.materialLotIdList = materialLotIdList;
        this.materialLotActionList = materialLotActionList;
        this.dataList = dataList;
    }

    static buildGetReturnLotInfo(documentId){
        return new ReturnLotOrderRequestBody(actionType.GetMaterialLot, documentId, undefined);
    }

    static buildReturnLot(documentId, materialLots){
        const materialLotIdList = [];
        materialLots.forEach(mLot => {
            materialLotIdList.push(mLot.materialLotId);
        });
        return new ReturnLotOrderRequestBody(actionType.ReturnLot, documentId, materialLotIdList);
    }

    static buildCreateReturnOrder(materialLots){
        const materialLotActionList = [];
        materialLots.forEach(mLot => {
           let materialLotAction = new MaterialLotAction();
           materialLotAction.setMaterialLotId(mLot.materialLotId);
           materialLotAction.setTransQty(mLot.transQty);
           materialLotAction.setActionReason(mLot.actionReason);
           materialLotActionList.push(materialLotAction);
        });
       return new ReturnLotOrderRequestBody(actionType.CreateReturnMaterialLotOrder, undefined, undefined, materialLotActionList);
   }

    static buildReturnMLotByOrder(documentId, materialLots){
        const materialLotIdList = [];
        materialLots.forEach(mLot => {
            materialLotIdList.push(mLot.materialLotId);
        });
        return new ReturnLotOrderRequestBody(actionType.ReturnMaterialLot, documentId, materialLotIdList);
    }

    static buildCreateReturnGoods(dataList){
        return new ReturnLotOrderRequestBody(actionType.CreateReturnGoodsOrder, undefined, undefined,undefined, dataList);
    }

    static buildReturnGoods(documentId, materialLots){
        const materialLotIdList = [];
        materialLots.forEach(mLot => {
            materialLotIdList.push(mLot.materialLotId);
        });
        return new ReturnLotOrderRequestBody(actionType.ReturnGoods, documentId, materialLotIdList);
    }

    static buildCreateDeptReturnOrder(materialLots){
        const materialLotActionList = [];
        materialLots.forEach(mLot => {
           let materialLotAction = new MaterialLotAction();
           materialLotAction.setMaterialLotId(mLot.materialLotId);
           materialLotAction.setTransQty(mLot.transQty);
           materialLotAction.setActionReason(mLot.actionReason);
           materialLotAction.setActionComment(mLot.actionComment);
           materialLotActionList.push(materialLotAction);
        });
       return new ReturnLotOrderRequestBody(actionType.CreateDeptReturnOrder, undefined, undefined, materialLotActionList);
   }

   static buildDeptReturnMLot(documentId, materialLots){
        const materialLotIdList = [];
        materialLots.forEach(mLot => {
            materialLotIdList.push(mLot.materialLotId);
        });
        return new ReturnLotOrderRequestBody(actionType.DeptReturnMLot, documentId, materialLotIdList);
    }

    static sendGetReservedMLotRequest(documentId, materialLots){
        const materialLotIdList = [];
        materialLots.forEach(mLot => {
            materialLotIdList.push(mLot.materialLotId);
        });
        return new ReturnLotOrderRequestBody(actionType.GetReservedMLot, documentId, materialLotIdList);
    }
}