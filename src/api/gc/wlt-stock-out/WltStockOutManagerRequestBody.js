import MaterialLotAction from "../../dto/mms/MaterialLotAction";

const actionType = {
    WltStockOut: "WltStockOut",
    validationWltMlot: "validationWltMlot",
}

export default class WltStockOutManagerRequestBody {

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
    
    static buildWltStockOut(documentLine, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });

        return new WltStockOutManagerRequestBody(actionType.WltStockOut, documentLine, materialLotActions, undefined);
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

}


