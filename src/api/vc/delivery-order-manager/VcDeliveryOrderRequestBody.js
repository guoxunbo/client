const actionType = {
    CreateDelivery : "createDelivery",
    ApproveDelivery :"approveDelivery",
}
export default class VcDeliveryOrderRequestBody {

    documentLineList;
    importTypeNbTable
    actionType;
    documentId;
  
    constructor(documentLineList, importTypeNbTable, actionType, documentId){
        this.documentLineList = documentLineList;
        this.importTypeNbTable = importTypeNbTable;
        this.actionType = actionType;
        this.documentId = documentId;
    }

    static buildImport(object) {
        return new VcDeliveryOrderRequestBody(undefined, object.importTypeNbTable);
    }
    
    static buildSave(documentLineList) {
        return new VcDeliveryOrderRequestBody(documentLineList, undefined, actionType.CreateDelivery);
    }

    static buildApproveRequest(documentId) {
        return new VcDeliveryOrderRequestBody(undefined, undefined, actionType.ApproveDelivery, documentId);
    }
}