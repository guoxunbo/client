import MaterialLotAction from "../../dto/mms/MaterialLotAction";

const actionType = {
    StockOut: "StockOut",
    Validation: "validation",
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
    
    static buildStockOut(documentLine, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });

        return new StockOutManagerRequestBody(actionType.StockOut, documentLine, materialLotActions, undefined);
    }

    static buildValidateMaterial(queryMaterialLot, materialLots) {
        debugger;
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new StockOutManagerRequestBody(actionType.Validation, undefined, materialLotActions, queryMaterialLot);
    }

}


