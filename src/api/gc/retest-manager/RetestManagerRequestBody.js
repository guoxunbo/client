import MaterialLotAction from "../../dto/mms/MaterialLotAction";

export default class RetestManagerRequestBody {

    documentLine;
    materialLotActions;

    constructor(documentLine, materialLotActions){
        this.documentLine = documentLine;
        this.materialLotActions = materialLotActions;
    }
    
    static buildRetest(documentLine, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });

        return new RetestManagerRequestBody(documentLine, materialLotActions);
    }

}


