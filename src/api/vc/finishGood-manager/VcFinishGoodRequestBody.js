
const actionType = {
    GetMaterialLot : "GetMaterialLot",
    FinishGoodReceive :"FinishGoodReceive",
}

export default class VcFinishGoodRequestBody {

    actionType;
    documentId;
    materialLotIdList
  
    constructor(actionType, documentId, materialLotIdList){
        this.actionType = actionType;
        this.documentId = documentId;
        this.materialLotIdList = materialLotIdList;
    }

    static buildGetMaterialLot(documentId) {
        return new VcFinishGoodRequestBody(actionType.GetMaterialLot, documentId);
    }
    
    static buildReceive(documentId, materialLots) {
        let materialLotIdList = [];
        materialLots.forEach(mLot => {
            materialLotIdList.push(mLot.materialLotId);
        });
        return new VcFinishGoodRequestBody(actionType.FinishGoodReceive, documentId, materialLotIdList);
    }

   
}