import StockInModel from "../stock-in/StockInModel";

const ActionType = {
    Receive: "Receive",
    Query: "Query",
    StockIn: "StockIn",
}

export default class FtMLotManagerRequestBody {

    actionType;
    materialLotUnitList;
    unitId;
    tableRrn;
    materialLotId;
    stockInModels;

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
}


