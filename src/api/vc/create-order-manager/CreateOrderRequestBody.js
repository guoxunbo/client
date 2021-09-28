const ActionType = {
    CreateDocument:"createDocument",
    CreateDocumentLine:"createDocumentLine",
}
export {ActionType} 
export default class CreateOrderRequestBody {

    actionType;
    document;
    documentLine;
  
    constructor(actionType, document, documentLine){
        this.actionType = actionType;
        this.document = document;
        this.documentLine = documentLine;
    }

    static buildOrder = (document) =>{
        return new CreateOrderRequestBody(ActionType.CreateDocument, document);
    }

    static buildOrderLine = (documentLine) =>{
        return new CreateOrderRequestBody(ActionType.CreateDocumentLine, null, documentLine);
    }

}