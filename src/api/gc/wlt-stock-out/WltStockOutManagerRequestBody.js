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
    SaleShip: "SaleShip",
    GCRWAttributeChange: "GCRWAttributeChange",
    WltOtherStockOut: "WltOtherStockOut",
    WltOtherShipByOrder: "WltOtherShipByOrder",
    HNSampleCollectionStockOut: "HNSampleCollectionStockOut",
    HNWarehouseWltOtherStockOut: "HNWarehouseWltOtherStockOut",
    MobileWltStockOut: "MobileWltStockOut",
    MobileSaleShip: "MobileSaleShip",
    SaleAndthreeSide: "SaleAndthreeSide",
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
    
    static buildGCRWAttributeChange(materialLots) {
        let  body = new WltStockOutManagerRequestBody(actionType.GCRWAttributeChange);
        body.materialLots = materialLots;
        return body;
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

    static buildWltOtherStockOut(documentLines, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        let body = new WltStockOutManagerRequestBody(actionType.WltOtherStockOut, documentLines, materialLotActions);
        return body;
    }

    static buildWltShipByOrder(documentLine, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        let body = new WltStockOutManagerRequestBody(actionType.WltOtherShipByOrder);
        body.documentLine = documentLine;
        body.materialLotActions = materialLotActions;
        return body;
    }

    static buildHNSampleCollectionStockOut(documentLines, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        let body = new WltStockOutManagerRequestBody(actionType.HNSampleCollectionStockOut, documentLines, materialLotActions);
        return body;
    }

    static buildHNWarehouseWltOtherStockOut(documentLines, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        let body = new WltStockOutManagerRequestBody(actionType.HNWarehouseWltOtherStockOut, documentLines, materialLotActions);
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

    static buildSaleStockOut(documentLines, materialLots, checkSubCode) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        let body = new WltStockOutManagerRequestBody(actionType.SaleShip, documentLines, materialLotActions);
        body.checkSubCode = checkSubCode;
        return body;
    }

    static buildSaleAndthreeSideStockOut(documentLine, materialLots, checkSubCode) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        let body = new WltStockOutManagerRequestBody(actionType.SaleAndthreeSide, undefined, materialLotActions);
        body.checkSubCode = checkSubCode;
        body.documentLine = documentLine;
        return body;
    }

    static buildMobileWltStockOut(materialLots, checkSubCode, erpTime) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        let body = new WltStockOutManagerRequestBody(actionType.MobileWltStockOut, undefined, materialLotActions);
        body.checkSubCode = checkSubCode;
        body.erpTime = erpTime;
        return body;
    }

    static buildMobileSaleStockOut(materialLots, checkSubCode, erpTime) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        let body = new WltStockOutManagerRequestBody(actionType.MobileSaleShip, undefined, materialLotActions);
        body.checkSubCode = checkSubCode;
        body.erpTime = erpTime;
        return body;
    }

}


