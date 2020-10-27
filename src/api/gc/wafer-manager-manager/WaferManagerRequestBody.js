import MaterialLotAction from "../../dto/mms/MaterialLotAction";

const ActionType = {
    Receive: "Receive",
    Issue: "Issue",
    ValidationIssue: "ValidationIssue",
    GetWaitIssueMLot: "GetWaitIssueMLot",
    PurchaseOutsoureReceive: "PurchaseOutsoureReceive",
}
export default class WaferManagerRequestBody {

    actionType;
    documentLines;
    materialLotActions;
    tableRrn;
    whereClause;
    issueWithDoc;
    unPlanLot;


    constructor(actionType, documentLines, materialLotActions, tableRrn, whereClause, issueWithDoc, unPlanLot){
        this.actionType = actionType;
        this.documentLines = documentLines;
        this.materialLotActions = materialLotActions;
        this.tableRrn = tableRrn;
        this.whereClause = whereClause;
        this.issueWithDoc = issueWithDoc;
        this.unPlanLot = unPlanLot;
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

    static buildIssue(documentLines, materialLots, issueWithDoc, unPlanLot) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });

        return new WaferManagerRequestBody(ActionType.Issue, documentLines, materialLotActions, undefined, undefined, issueWithDoc, unPlanLot);
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

    static buildGetMaterialLot(tableRrn,whereClause) {
        return new WaferManagerRequestBody(ActionType.GetWaitIssueMLot, undefined, undefined, tableRrn, whereClause);
    }
}


