import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

export default class StockOutManagerRequestBody {

    documentLine;
    materialLotActions;

    constructor(documentLine, materialLotActions){
        this.documentLine = documentLine;
        this.materialLotActions = materialLotActions;
    }
    
    static buildStockOut(documentLine, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });

        return new StockOutManagerRequestBody(documentLine, materialLotActions);
    }

}


