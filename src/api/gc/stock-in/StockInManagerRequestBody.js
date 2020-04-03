import StockInModel from "./StockInModel";

const ActionType = {
    Query: "Query",
    StockIn: "StockIn",
    QueryWafer: "QueryWafer",
}

export default class StockInManagerRequestBody {

    actionType;
    materialLotId;
    stockInModels;
    lotId;

    constructor(actionType, materialLotId, lotId){
        this.actionType = actionType;
        this.materialLotId = materialLotId;
        this.lotId = lotId;
    }
    
    setStockInModels(stockInModels) {
        this.stockInModels = stockInModels;
    }

    static buildQuery(materialLotId) {
        return new StockInManagerRequestBody(ActionType.Query, materialLotId);
    }

    static buildQueryWafer(lotId) {
        return new StockInManagerRequestBody(ActionType.QueryWafer, undefined, lotId);
    }

    static buildStockIn(materialLots) {
        let stockInModels = [];
        materialLots.forEach(materialLot => {
            let stockInModel = new StockInModel(materialLot.materialLotId, materialLot.relaxBoxId, materialLot.storageId);
            stockInModels.push(stockInModel);
        });

        let requestBody = new StockInManagerRequestBody(ActionType.StockIn);
        requestBody.setStockInModels(stockInModels);
        return requestBody;
    }

}


