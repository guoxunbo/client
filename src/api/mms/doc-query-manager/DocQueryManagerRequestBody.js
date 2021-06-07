const ActionType = {
    QueryMLotByOrder: "queryMLotByOrder",
    QueryOrderByMLotId: "queryOrderByMLotId",
    DeleteDocument: "deleteDocument",
}

export default class DocQueryManagerRequestBody {

    actionType;
    documentId;
    materialLotId;
    documentCategory

    constructor(actionType, documentId, materialLotId, documentCategory){
        this.actionType = actionType;
        this.documentId = documentId;
        this.materialLotId = materialLotId;
        this.documentCategory = documentCategory;
    }

    static buildQueryMLotByOrder(documentId){
        return new DocQueryManagerRequestBody(ActionType.QueryMLotByOrder, documentId);
    }

    static buildQueryOrderByMLotId(materialLotId, documentCategory){
        return new DocQueryManagerRequestBody(ActionType.QueryOrderByMLotId, undefined, materialLotId, documentCategory);
    }

    static buildDeleteDocument(materialLotId){
        return new DocQueryManagerRequestBody(ActionType.DeleteDocument, materialLotId);
    }
}

