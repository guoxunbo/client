
const actionType = {
    GetMaterialLot : "GetMaterialLot",
    FinishGoodReceive : "FinishGoodReceive",
}

export default class VcFinishGoodReceiveRequestBody {

    actionType;
    documentId;
    materialLotIdList;
  
    constructor(actionType, documentId, materialLotIdList){
        this.actionType = actionType;
        this.documentId = documentId;
        this.materialLotIdList = materialLotIdList;
    }
    

    static buildGetMaterialLot(documentId) {
        return new VcFinishGoodReceiveRequestBody(actionType.GetMaterialLot, documentId);
    }

    static buildReceiveFinishGood(documentId, materialLotList) {
        let materialLotIdList = [];
        materialLotList.forEach(mLot => {
            materialLotIdList.push(mLot.materialLotId);
        });
        return new VcFinishGoodReceiveRequestBody(actionType.FinishGoodReceive, documentId, materialLotIdList);
    }
}