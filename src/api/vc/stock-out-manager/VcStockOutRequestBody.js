import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

const actionType = {
    GetMaterialLot : "GetMaterialLot",
    ShipOut :"ShipOut",
}

export default class VcStockOutRequestBody {

    actionType;
    docLineId;
    materialLots;
  
    constructor(actionType, docLineId, materialLots){
        this.actionType = actionType;
        this.docLineId = docLineId;
        this.materialLots = materialLots;
    }

    static buildGetMaterialLot(docLineId) {
        return new VcStockOutRequestBody(actionType.GetMaterialLot, docLineId);
    }
    
    static buildStockOut(docLineId, materialLots) {
        return new VcStockOutRequestBody(actionType.ShipOut, docLineId, materialLots);
    }
}