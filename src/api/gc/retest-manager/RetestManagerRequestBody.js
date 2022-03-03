import MaterialLotAction from "../../dto/mms/MaterialLotAction";

const ActionType = {
    MobileRetest: "MobileRetest",
    FtRetest: "FtRetest",
    ComRetest: "ComRetest"
}

export default class RetestManagerRequestBody {

    documentLines;
    materialLotActions;
    actionType;

    constructor(documentLines, materialLotActions, actionType){
        this.documentLines = documentLines;
        this.materialLotActions = materialLotActions;
        this.actionType = actionType;
    }
    
    static buildRetest(documentLines, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });

        return new RetestManagerRequestBody(documentLines, materialLotActions, ActionType.ComRetest);
    }

    static buildFtRetest(documentLines, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new RetestManagerRequestBody(documentLines, materialLotActions, ActionType.FtRetest);
    }

    static buildMobileRetest(materialLotList, erpTime) {
        let body = new RetestManagerRequestBody(undefined, materialLotList);
        body.erpTime = erpTime;
        body.actionType = ActionType.MobileRetest;
        return body;
    }

}


