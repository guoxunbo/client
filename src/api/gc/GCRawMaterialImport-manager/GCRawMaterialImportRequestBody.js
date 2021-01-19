const ActionType = {
    Create: "Create",
    Receive: "Receive",
    RawIssue: "RawIssue",
    Scrap: "Scrap",
}

export default class GCRawMaterialImportRequestBody {

    actionType;
    materialLotList;
    importType;
    documentLine;

    constructor(actionType, materialLotList, importType, documentLine){
        this.actionType = actionType;
        this.materialLotList = materialLotList;
        this.importType = importType;
        this.documentLine = documentLine;
    }

    static buildSelectFile() {
        return new GCRawMaterialImportRequestBody();
    }

    static buildImportInfo(materialLotList, importType) {
        return new GCRawMaterialImportRequestBody(ActionType.Create, materialLotList, importType);
    }

    static buildReceiveRawMaterial(materialLotList) {
        return new GCRawMaterialImportRequestBody(ActionType.Receive, materialLotList);
    }

    static buildRawMaterialIssue(materialLotList, documentLine) {
        return new GCRawMaterialImportRequestBody(ActionType.RawIssue, materialLotList, undefined, documentLine);
    }

    static buildScrapRawMaterial(materialLotList, reason, remarks) {
        let body =  new GCRawMaterialImportRequestBody(ActionType.Scrap, materialLotList);
        body.reason = reason;
        body.remarks = remarks;
        return body;
    }
}