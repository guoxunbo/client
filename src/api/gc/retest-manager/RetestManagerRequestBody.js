import MaterialLotAction from "../../dto/mms/MaterialLotAction";

export default class RetestManagerRequestBody {

    documentLines;
    materialLotActions;

    constructor(documentLines, materialLotActions){
        this.documentLines = documentLines;
        this.materialLotActions = materialLotActions;
    }
    
    static buildRetest(documentLines, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });

        return new RetestManagerRequestBody(documentLines, materialLotActions);
    }

    static buildMobileRetest(materialLotList, erpTime, actionType) {
        let body = new RetestManagerRequestBody(undefined, materialLotList);
        body.erpTime = erpTime;
        body.actionType = "MobileRetest";
        return body;
    }

}


