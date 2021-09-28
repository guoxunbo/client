const ActionType = {
    GetMaterialLot: "GetMaterialLot",
    StockUp: "StockUp",
}

export default class DocStockUpManagerRequestBody {

    actionType;
    docLineId;
    materialLots;

    constructor(actionType, docLineId, materialLots){
        this.actionType = actionType;
        this.docLineId = docLineId;
        this.materialLots = materialLots;
    }

    static buildGetMaterialLotList(docLineId){
        return new DocStockUpManagerRequestBody(ActionType.GetMaterialLot, docLineId);
    }

    static buildStockUp(docLineId, materialLots){
        return new DocStockUpManagerRequestBody(ActionType.StockUp, docLineId, materialLots);
    }
}

