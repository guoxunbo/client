import MaterialLotAction from "../../dto/mms/MaterialLotAction";

const ActionType = {
    Receive: "Receive",
    Issue: "Issue",
    ValidationIssue: "ValidationIssue",
    ValidationWaitIssue: "ValidationWaitIssue",
    PurchaseOutsoureReceive: "PurchaseOutsoureReceive",
}
export default class WaferManagerRequestBody {

    actionType;
    documentLines;
    materialLotActions;

    constructor(actionType, documentLines, materialLotActions){
        this.actionType = actionType;
        this.documentLines = documentLines;
        this.materialLotActions = materialLotActions;
    }
    
    static buildReceive(documentLines, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });

        return new WaferManagerRequestBody(ActionType.Receive, documentLines, materialLotActions);
    }

    static buildValidationWaferIssue(documentLines, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });

        return new WaferManagerRequestBody(ActionType.ValidationIssue, documentLines, materialLotActions);
    }

    static buildIssue(documentLines, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });

        return new WaferManagerRequestBody(ActionType.Issue, documentLines, materialLotActions);
    }

    static buildValidationWaitIssueWafer(materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new WaferManagerRequestBody(ActionType.ValidationWaitIssue, undefined, materialLotActions);
    }

    static buildPurchaseOutsoureReceiveWafer(materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new WaferManagerRequestBody(ActionType.PurchaseOutsoureReceive, undefined, materialLotActions);
    }
}


