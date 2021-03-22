import { DefaultRowKey } from "../../const/ConstDefine";

const ActionType = {
    Query : "Query",
    Check : "Check"
}

export default class CheckInventoryManagerRequestBody {

    actionType;
    existMaterialLots;
    errorMaterialLots;

    constructor(actionType, existMaterialLots, errorMaterialLots){
        this.actionType = actionType;
        this.existMaterialLots = existMaterialLots;
        this.errorMaterialLots = errorMaterialLots;
    }

    static checkInventory(object) {
        let errorMaterialLots = object.errorMaterialLots;
        errorMaterialLots.forEach(materialLot => {
            materialLot[DefaultRowKey] = undefined;
        });
        return new CheckInventoryManagerRequestBody(ActionType.Check, object.existMaterialLots, errorMaterialLots);
    }

    static queryCheckMaterialLot(queryLotId, tableRrn) {
        let body =  new CheckInventoryManagerRequestBody(ActionType.Query);
        body.queryLotId = queryLotId;
        body.tableRrn = tableRrn;
        return body;
    }
}


