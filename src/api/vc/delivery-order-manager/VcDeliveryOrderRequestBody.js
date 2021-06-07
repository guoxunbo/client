const actionType = {
    CreateDelivery : "createDelivery",
    ApproveDelivery :"approveDelivery",
    CreateByReelDelivery : "createByReelDelivery",
}
export default class VcDeliveryOrderRequestBody {

    documentLineList;
    importTypeNbTable
    actionType;
    documentId;
  
    constructor(actionType, documentLineList, importTypeNbTable, documentId){
        this.actionType = actionType;

        this.documentLineList = documentLineList;
        this.importTypeNbTable = importTypeNbTable;
        this.documentId = documentId;
    }
    
    static buildSave(documentLineList) {
        return new VcDeliveryOrderRequestBody(actionType.CreateDelivery, documentLineList);
    }

    static buildApproveRequest(documentId) {
        return new VcDeliveryOrderRequestBody(actionType.ApproveDelivery, undefined, undefined, documentId);
    }

}