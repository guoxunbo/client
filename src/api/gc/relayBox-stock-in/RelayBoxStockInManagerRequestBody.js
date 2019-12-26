import RelayBoxStockInModel from "./RelayBoxStockInModel";

const ActionType = {
    QueryRelayBox: "QueryRelayBox",
    QueryBox: "QueryBox",
    RelayBoxStockIn: "RelayBoxStockIn",
}

export default class RelayBoxStockInManagerRequestBody {

    actionType;
    materialLotId;
    relayBoxStockInModels;
    relayBoxId;

    constructor(actionType, materialLotId, relayBoxId){
        this.actionType = actionType;
        this.materialLotId = materialLotId;
        this.relayBoxId = relayBoxId;
    }

    setRelayBoxStockInModels(relayBoxStockInModels) {
        this.relayBoxStockInModels = relayBoxStockInModels;
    }

    static buildQueryBox(materialLotId) {
        return new RelayBoxStockInManagerRequestBody(ActionType.QueryBox, materialLotId);
    }

    static buildQueryRelayBox(relayBoxId) {
        return new RelayBoxStockInManagerRequestBody(ActionType.QueryRelayBox, undefined, relayBoxId);
    }
    

    static buildRelayBoxChangeStorage(materialLots) {
        let relayBoxStockInModels = [];
        materialLots.forEach(materialLot => {
            let relayBoxStockInModel = new RelayBoxStockInModel(materialLot.materialLotId, materialLot.storageId);
            relayBoxStockInModels.push(relayBoxStockInModel);
        });

        let requestBody = new RelayBoxStockInManagerRequestBody(ActionType.RelayBoxStockIn);
        requestBody.setRelayBoxStockInModels(relayBoxStockInModels);
        return requestBody;
    }


}