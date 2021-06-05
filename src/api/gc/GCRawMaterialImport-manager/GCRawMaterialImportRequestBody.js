const ActionType = {
    Create: "Create",
    Receive: "Receive",
    RawIssue: "RawIssue",
    Scrap: "Scrap",
    Delete: "Delete",
    QuerySpareMLot: "QuerySpareMLot",
    GetSpareRawMLot: "GetSpareRawMLot",
    SpareRawMLot: "SpareRawMLot",
    QueryIssueRawMaterialLot: "QueryIssueRawMaterialLot",
    ScrapRawMLotShip: "ScrapRawMLotShip",
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

    static buildRawMaterialIssue(materialLotList, documentLineList) {
        let body = new GCRawMaterialImportRequestBody(ActionType.RawIssue, materialLotList);
        body.documentLineList = documentLineList;
        return body;
    }

    static buildScrapRawMaterial(materialLotList, reason, remarks) {
        let body =  new GCRawMaterialImportRequestBody(ActionType.Scrap, materialLotList);
        body.reason = reason;
        body.remarks = remarks;
        return body;
    }

    static buildDeleteRawMaterial(materialLotList, deleteNote) {
        let body =  new GCRawMaterialImportRequestBody(ActionType.Delete, materialLotList);
        body.deleteNote = deleteNote;
        return body;
    }

    static buildGetWaitSpareRawMaterialLot(docLineRrn, tableRrn) {
        let body =  new GCRawMaterialImportRequestBody(ActionType.QuerySpareMLot);
        body.docLineRrn = docLineRrn;
        body.tableRrn = tableRrn;
        return body;
    }

    static buildGetSpareRawMaterialLot(materialLotList, docLineRrn) {
        let body =  new GCRawMaterialImportRequestBody(ActionType.GetSpareRawMLot, materialLotList);
        body.docLineRrn = docLineRrn;
        return body;
    }

    static buildSpareRawMaterialLot(materialLotList, docLineRrn) {
        let body =  new GCRawMaterialImportRequestBody(ActionType.SpareRawMLot, materialLotList);
        body.docLineRrn = docLineRrn;
        return body;
    }

    static buildGetDataByLotIdAndTableRrn(queryLotId, tableRrn) {
        let body =  new GCRawMaterialImportRequestBody(ActionType.QueryIssueRawMaterialLot);
        body.queryLotId = queryLotId;
        body.tableRrn = tableRrn;
        return body;
    }

    static buildScrapRawMaterialShip(documentLine, materialLotList) {
        let body =  new GCRawMaterialImportRequestBody(ActionType.ScrapRawMLotShip);
        body.documentLine = documentLine;
        body.materialLotList = materialLotList;
        return body;
    }
}