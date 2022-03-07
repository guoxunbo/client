const ActionType = {
    Create: "Create",
    Receive: "Receive",
    RawIssue: "RawIssue",
    Scrap: "Scrap",
    Delete: "Delete",
    QuerySpareMLot: "QuerySpareMLot",
    GetSpareRawMLot: "GetSpareRawMLot",
    GetSpareRawOutDoc: "GetSpareRawOutDoc",
    SpareRawMLot: "SpareRawMLot",
    RawMaterialSpareOutDoc: "RawMaterialSpareOutDoc",
    QueryIssueRawMaterialLot: "QueryIssueRawMaterialLot",
    ScrapRawMLotShip: "ScrapRawMLotShip",
    GCUnRawMaterialSpare: "GCUnRawMaterialSpare",
    MobileRawIssue: "MobileRawIssue",
    MobileRawMaterialOtherShip: "MobileRawMaterialOtherShip",
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

    static buildGCUnRawMaterialSpare(materialLotList){
        return new GCRawMaterialImportRequestBody(ActionType.GCUnRawMaterialSpare, materialLotList);
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

    static buildRawMaterialIssue(materialLotList, documentLineList,issueWithDoc) {
        let body = new GCRawMaterialImportRequestBody(ActionType.RawIssue, materialLotList);
        body.documentLineList = documentLineList;
        body.issueWithDoc = issueWithDoc;
        return body;
    }

    static buildMobileRawMaterialIssue(materialLotList, erpTime) {
        let body = new GCRawMaterialImportRequestBody(ActionType.MobileRawIssue, materialLotList);
        body.erpTime = erpTime;
        return body;
    }

    static buildScrapRawMaterial(materialLotList, reason, remarks) {
        let body =  new GCRawMaterialImportRequestBody(ActionType.Scrap, materialLotList);
        body.reason = reason;
        body.remarks = remarks;
        return body;
    }

    static buildDeleteRawMaterial(materialLotList, remarks) {
        let body =  new GCRawMaterialImportRequestBody(ActionType.Delete, materialLotList);
        body.remarks = remarks;
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

    static buildGetRawMaterialSpareOutDoc(materialLotList, pickQty) {
        let body =  new GCRawMaterialImportRequestBody(ActionType.GetSpareRawOutDoc, materialLotList);
        body.pickQty = pickQty;
        return body;
    }

    static buildSpareRawMaterialLot(materialLotList, docLineRrn) {
        let body =  new GCRawMaterialImportRequestBody(ActionType.SpareRawMLot, materialLotList);
        body.docLineRrn = docLineRrn;
        return body;
    }

    static buildRawMaterialSpareOutDoc(materialLotList) {
        let body =  new GCRawMaterialImportRequestBody(ActionType.RawMaterialSpareOutDoc, materialLotList);
        return body;
    }

    static buildGetDataByLotIdAndTableRrn(queryLotId, tableRrn) {
        let body =  new GCRawMaterialImportRequestBody(ActionType.QueryIssueRawMaterialLot);
        body.queryLotId = queryLotId;
        body.tableRrn = tableRrn;
        return body;
    }

    static buildScrapRawMaterialShip(documentLineList, materialLotList) {
        let body =  new GCRawMaterialImportRequestBody(ActionType.ScrapRawMLotShip);
        body.documentLineList = documentLineList;
        body.materialLotList = materialLotList;
        return body;
    }

    static buildMobileRawMaterialOtherShip(erpTime, materialLotList) {
        let body =  new GCRawMaterialImportRequestBody(ActionType.MobileRawMaterialOtherShip);
        body.erpTime = erpTime;
        body.materialLotList = materialLotList;
        return body;
    }
    
}