import StockInModel from "./StockInModel";

const ActionType = {
    Query: "Query",
    StockIn: "StockIn",
}

export default class StockInManagerRequestBody {

    actionType;
    materialLotId;
    stockInModels;

    constructor(actionType, materialLotId){
        this.actionType = actionType;
        this.materialLotId = materialLotId;
    }
    
    setStockInModels(stockInModels) {
        this.stockInModels = stockInModels;
    }

    static buildQuery(materialLotId) {
        return new StockInManagerRequestBody(ActionType.Query, materialLotId);
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


