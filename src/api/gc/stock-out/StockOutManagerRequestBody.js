import MaterialLotAction from "../../dto/mms/MaterialLotAction";

const actionType = {
    StockOut: "StockOut",
    Validation: "validation",
    SaleShip: "SaleShip",
    TransferShip: "TransferShip",
}

export default class StockOutManagerRequestBody {

    actionType;
    documentLine;
    materialLotActions;
    queryMaterialLot;

    constructor(actionType, documentLine, materialLotActions, queryMaterialLot){
        this.actionType = actionType;
        this.documentLine = documentLine;
        this.materialLotActions = materialLotActions;
        this.queryMaterialLot = queryMaterialLot;
    }
    
    static buildStockOut(documentLineList, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        let body = new StockOutManagerRequestBody(actionType.StockOut);
        body.documentLineList = documentLineList;
        body.materialLotActions = materialLotActions;
        return body;
    }

    static buildComSaleShip(documentLineList, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        let body = new StockOutManagerRequestBody(actionType.SaleShip);
        body.documentLineList = documentLineList;
        body.materialLotActions = materialLotActions;
        return body;
    }

    static buildValidateMaterial(queryMaterialLot, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new StockOutManagerRequestBody(actionType.Validation, undefined, materialLotActions, queryMaterialLot);
    }

    static buildTransferShip(documentLine, materialLots, warehouseId) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        let body = new StockOutManagerRequestBody(actionType.TransferShip);
        body.documentLine = documentLine;
        body.materialLotActions = materialLotActions;
        body.warehouseId = warehouseId;
        return body;
    }

}


