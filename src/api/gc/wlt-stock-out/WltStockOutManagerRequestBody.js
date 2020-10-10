import MaterialLotAction from "../../dto/mms/MaterialLotAction";

const actionType = {
    WltStockOut: "WltStockOut",
    validationWltMlot: "validationWltMlot",
    queryTagMlotUnit: "queryTagMlotUnit",
    StockOutTag: "StockOutTag",
    UnStockOutTag: "UnStockOutTag",
    ValidateVender: "ValidateVender",
    GetMLot: "GetMLot",
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


    constructor(actionType, documentLines, materialLotActions, queryMaterialLot, stockTagNote, customerName,stockOutType, poId){
        this.actionType = actionType;
        this.documentLines = documentLines;
        this.materialLotActions = materialLotActions;
        this.queryMaterialLot = queryMaterialLot;
        this.stockTagNote = stockTagNote;
        this.customerName = customerName;
        this.stockOutType = stockOutType;
        this.poId = poId;
    }
    
    static buildWltStockOut(documentLines, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });

        return new WltStockOutManagerRequestBody(actionType.WltStockOut, documentLines, materialLotActions, undefined);
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

    static buildStockOutTagging(materialLots, stockTagNote, customerName, stockOutType, poId) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new WltStockOutManagerRequestBody(actionType.StockOutTag, undefined, materialLotActions, undefined, stockTagNote, customerName, stockOutType, poId);
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

}


