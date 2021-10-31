const actionType = {
    CreateDelivery : "createDelivery",
    ApproveDelivery :"approveDelivery",
    Delete : "Delete",
}
export default class VcDeliveryOrderRequestBody {

    documentLineList;
    importTypeNbTable
    actionType;
    documentId;
    deliveryLineId;
  
    constructor(actionType, documentLineList, importTypeNbTable, documentId, deliveryLineId){
        this.actionType = actionType;

        this.documentLineList = documentLineList;
        this.importTypeNbTable = importTypeNbTable;
        this.documentId = documentId;
        this.deliveryLineId = deliveryLineId;
    }
    
    static buildSave(documentLineList) {
        return new VcDeliveryOrderRequestBody(actionType.CreateDelivery, documentLineList);
    }

    static buildApproveRequest(documentId) {
        return new VcDeliveryOrderRequestBody(actionType.ApproveDelivery, undefined, undefined, documentId);
    }

    static buildDeleteRequest(deliveryLineId) {
        return new VcDeliveryOrderRequestBody(actionType.Delete, undefined, undefined, undefined, deliveryLineId);
    }

}