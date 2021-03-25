import MaterialLotAction from "../../dto/mms/MaterialLotAction";

const actionType = {
    WltStockOut: "WltStockOut",
    validationWltMlot: "validationWltMlot",
    queryTagMlotUnit: "queryTagMlotUnit",
    StockOutTag: "StockOutTag",
    UnStockOutTag: "UnStockOutTag",
    ValidateVender: "ValidateVender",
    GetMLot: "GetMLot",
    ValidateMaterialName: "ValidateMaterialName",
    ThreeSideShip: "ThreeSideShip",
}

export default class WltStockOutManagerRequestBody {

    actionType;
    documentLines;
    materialLotActions;
    queryMaterialLot;
    stockTagNote;
    customerName;
    stockOutType;
    poId;
    tableRrn;
    queryLotId;
    documentLine;
    address;


    constructor(actionType, documentLines, materialLotActions, queryMaterialLot, stockTagNote, customerName,stockOutType, poId, address){
        this.actionType = actionType;
        this.documentLines = documentLines;
        this.materialLotActions = materialLotActions;
        this.queryMaterialLot = queryMaterialLot;
        this.stockTagNote = stockTagNote;
        this.customerName = customerName;
        this.stockOutType = stockOutType;
        this.poId = poId;
        this.address = address; 
    }
    
    static buildWltStockOut(documentLines, materialLots, checkSubCode) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        let body = new WltStockOutManagerRequestBody(actionType.WltStockOut, documentLines, materialLotActions);
        body.checkSubCode = checkSubCode;
        return body;
    }

    static buildThreeSideShip(documentLine, materialLots) {
        let body = new WltStockOutManagerRequestBody(actionType.ThreeSideShip);
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        body.materialLotActions = materialLotActions;
        body.documentLine = documentLine;
        return body;
    }

    static buildValidateMLot(queryMaterialLot, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new WltStockOutManagerRequestBody(actionType.validationWltMlot, undefined, materialLotActions, queryMaterialLot);
    }

    static buildGetStockOutTagMLotUnit(materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new WltStockOutManagerRequestBody(actionType.queryTagMlotUnit, undefined, materialLotActions);
    }

    static buildStockOutTagging(materialLots, stockTagNote, customerName, stockOutType, poId, address) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        let body = new WltStockOutManagerRequestBody(actionType.StockOutTag, undefined, materialLotActions, undefined, stockTagNote, customerName, stockOutType, poId, address);
        return body;
    }

    static buildUnstockOutTagging(materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new WltStockOutManagerRequestBody(actionType.UnStockOutTag, undefined, materialLotActions);
    }

    static buildValidationVender(materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new WltStockOutManagerRequestBody(actionType.ValidateVender, undefined, materialLotActions);
    }

    setTableInfo(tableRrn, queryLotId) {
        this.tableRrn = tableRrn;
        this.queryLotId = queryLotId;
    }

    static buildGetMaterialLot(tableRrn, queryLotId) {
        let requestBody =  new WltStockOutManagerRequestBody(actionType.GetMLot);
        requestBody.setTableInfo(tableRrn, queryLotId);
        return requestBody;
    }

    static buildValidationMaterialName(materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new WltStockOutManagerRequestBody(actionType.ValidateMaterialName, undefined, materialLotActions);
    }

}


