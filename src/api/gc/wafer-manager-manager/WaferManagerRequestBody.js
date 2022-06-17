import MaterialLotAction from "../../dto/mms/MaterialLotAction";

const ActionType = {
    Receive: "Receive",
    Issue: "Issue",
    ValidationIssue: "ValidationIssue",
    GetWaitIssueMLot: "GetWaitIssueMLot",
    PurchaseOutsoureReceive: "PurchaseOutsoureReceive",
    HKMLotReceive: "HKMLotReceive",
    CogReceive: "CogReceive",
    OutOrderIssue: "OutOrderIssue",
    MobileGetWafer: "MobileGetWafer",
    MobileIssue: "MobileIssue",
    QueryCOBReceiveMLot: "QueryCOBReceiveMLot",
}
export default class WaferManagerRequestBody {

    actionType;
    documentLines;
    materialLotActions;
    tableRrn;
    whereClause;
    issueWithDoc;
    unPlanLot;
    receiveWithDoc;


    constructor(actionType, documentLines, materialLotActions, tableRrn, whereClause, issueWithDoc, unPlanLot){
        this.actionType = actionType;
        this.documentLines = documentLines;
        this.materialLotActions = materialLotActions;
        this.tableRrn = tableRrn;
        this.whereClause = whereClause;
        this.issueWithDoc = issueWithDoc;
        this.unPlanLot = unPlanLot;
    }

    setReceiveWithDoc(receiveWithDoc){
        this.receiveWithDoc = receiveWithDoc;
    }
    
    static buildReceive(documentLines, materialLots, receiveWithDoc) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotAction.setReserved4(materialLot.reserved4);
            materialLotActions.push(materialLotAction)
        });
        let body = new WaferManagerRequestBody(ActionType.Receive, documentLines, materialLotActions);
        body.setReceiveWithDoc(receiveWithDoc);
        return body;
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

    static buildMobileIssue(erpTime, materialLots, issueWithDoc, unPlanLot) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        let body = new WaferManagerRequestBody(ActionType.MobileIssue, undefined, materialLotActions, undefined, undefined, issueWithDoc, unPlanLot);
        body.erpTime = erpTime;
        return body;
    }

    static buildOutOrderIssue(materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new WaferManagerRequestBody(ActionType.OutOrderIssue, undefined, materialLotActions);
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
    
    static buildHKReceiveMaterialLot(materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new WaferManagerRequestBody(ActionType.HKMLotReceive, undefined, materialLotActions);
    
    }

    static buildCogMLotReceive(documentLines, materialLots, receiveWithDoc) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        let body = new WaferManagerRequestBody(ActionType.CogReceive, documentLines, materialLotActions);
        body.setReceiveWithDoc(receiveWithDoc);
        return body;
    }

    static buildMobileGetWaferByRrn(tableRrn, lotId) {
        let body = new WaferManagerRequestBody(ActionType.MobileGetWafer);
        body.tableRrn = tableRrn;
        body.lotId = lotId;
        return body;
    }

    static buildQueryCOBReceiveMaterialLot(tableRrn, lotId) {
        let body = new WaferManagerRequestBody(ActionType.QueryCOBReceiveMLot);
        body.tableRrn = tableRrn;
        body.lotId = lotId;
        return body;
    }
}


