
const actionType = {
    Receive : "Receive",
    GetMaterialLot: "GetMaterialLot",
}

export default class IncomingMaterialReceiveRequestBody {
  
    actionType;
    documentId;
    materialLotList;
  
    constructor(actionType, documentId, materialLotList){
        this.documentId = documentId;
        this.materialLotList = materialLotList;
        this.actionType = actionType;
    }
    
    static sendReceiveRequest(documentId, materialLotList) {
        return new IncomingMaterialReceiveRequestBody(actionType.Receive, documentId, materialLotList);
    }

    static sendGetMaterialLot(documentId) {
        return new IncomingMaterialReceiveRequestBody(actionType.GetMaterialLot, documentId);
    }
  
}