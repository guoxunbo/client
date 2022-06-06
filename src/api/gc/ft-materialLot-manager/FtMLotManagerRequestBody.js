import MaterialLotAction from "../../dto/mms/MaterialLotAction";
import StockInModel from "../stock-in/StockInModel";

const ActionType = {
    Receive: "Receive",
    Query: "Query",
    StockIn: "StockIn",
    QueryWaitIssueUnit: "QueryWaitIssueUnit",
    FtIssue: "FtIssue",
    FTStockOut: "FTStockOut",
    FTOutOrderIssue: "FTOutOrderIssue",
    SaleShip: "SaleShip",
    BSWFTStockOut: "BSWFTStockOut",
    BSWSaleShip: "BSWSaleShip",
}

export default class FtMLotManagerRequestBody {

    actionType;
    materialLotUnitList;
    unitId;
    tableRrn;
    materialLotId;
    stockInModels;
    documentLines;
    materialLotActions;
    issueWithDoc;
    queryMaterialLot;

    constructor(actionType, materialLotUnitList, unitId, tableRrn, materialLotId){
        this.actionType = actionType;
        this.materialLotUnitList = materialLotUnitList;
        this.unitId = unitId;
        this.tableRrn = tableRrn;
        this.materialLotId = materialLotId;
    }

    setStockInModels(stockInModels) {
        this.stockInModels = stockInModels;
    }
    
    setMaterialLotActions(materialLotActions) {
        this.materialLotActions = materialLotActions;
    }

    setDocumentLines(documentLines){
        this.documentLines = documentLines;
    }

    setIssueWithDoc(issueWithDoc){
        this.issueWithDoc = issueWithDoc;
    }
    
    setQueryMaterialLot(queryMaterialLot){
        this.queryMaterialLot = queryMaterialLot;
    }
    
    static buildReceive(materialLotUnitList) {
        return new FtMLotManagerRequestBody(ActionType.Receive, materialLotUnitList);
    }

    static buildQueryStockInMLot(unitId, tableRrn) {
        return new FtMLotManagerRequestBody(ActionType.Query, undefined, unitId, tableRrn);
    }

    static buildStockInFTMLot(materialLotUnitList) {
        let stockInModels = [];
        materialLotUnitList.forEach(materialLotUnit => {
            let stockInModel = new StockInModel(materialLotUnit.materialLotId, materialLotUnit.relaxBoxId, materialLotUnit.storageId);
            stockInModels.push(stockInModel);
        });

        let requestBody = new FtMLotManagerRequestBody(ActionType.StockIn, materialLotUnitList);
        requestBody.setStockInModels(stockInModels);
        return requestBody;
    }

    static buildQueryWaitIssueUnit(tableRrn) {
        return new FtMLotManagerRequestBody(ActionType.QueryWaitIssueUnit, undefined, undefined, tableRrn);
    }

    static buildUnitIssue(documentLines, materialLotUnitList, issueWithDoc) {
        let materialLotActions = [];
        materialLotUnitList.forEach(materialLotUnit => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLotUnit.unitId);
            materialLotActions.push(materialLotAction);
        });
        let requestBody = new FtMLotManagerRequestBody(ActionType.FtIssue);
        requestBody.setMaterialLotActions(materialLotActions);
        requestBody.setDocumentLines(documentLines);
        requestBody.setIssueWithDoc(issueWithDoc);
        return requestBody;
    }

    
    static buildUnitOutOrderIssue(materialLotUnitList) {
        let materialLotActions = [];
        materialLotUnitList.forEach(materialLotUnit => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLotUnit.unitId);
            materialLotActions.push(materialLotAction);
        });
        let requestBody = new FtMLotManagerRequestBody(ActionType.FTOutOrderIssue);
        requestBody.setMaterialLotActions(materialLotActions);
        return requestBody;
    }

    static buildFTStockOut(documentLines, materialLots) {
        let body = new FtMLotManagerRequestBody(ActionType.FTStockOut);
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        body.setMaterialLotActions(materialLotActions);
        body.setDocumentLines(documentLines);
        return body;
    }

    static buildFTSaleShip(documentLines, materialLots) {
        let body = new FtMLotManagerRequestBody(ActionType.SaleShip);
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        body.setMaterialLotActions(materialLotActions);
        body.setDocumentLines(documentLines);
        return body;
    }

    static buildBSWFTStockOut(documentLines, materialLots) {
        let body = new FtMLotManagerRequestBody(ActionType.BSWFTStockOut);
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        body.setMaterialLotActions(materialLotActions);
        body.setDocumentLines(documentLines);
        return body;
    }

    static buildBSWFTSaleShip(documentLines, materialLots) {
        let body = new FtMLotManagerRequestBody(ActionType.BSWSaleShip);
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        body.setMaterialLotActions(materialLotActions);
        body.setDocumentLines(documentLines);
        return body;
    }
}


