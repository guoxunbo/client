import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

const actionType = {
    Receive : "Receive",
    GetMaterialLot: "GetMaterialLot",
}

export default class IncomingMaterialReceiveRequestBody {
  
    actionType;
    documentId;
    materialLotList;
  
    constructor(actionType, documentId, materialLotList){
        this.actionType = actionType;
        this.documentId = documentId;
        this.materialLotList = materialLotList;
    }
    
    static sendReceiveRequest(documentId, materialLotList) {
        return new IncomingMaterialReceiveRequestBody(actionType.Receive, documentId, materialLotList);
    }

    static sendGetMaterialLot(documentId) {
        return new IncomingMaterialReceiveRequestBody(actionType.GetMaterialLot, documentId);
    }

}