
const ActionType = {
    OldRecordOrder: "OldRecordOrder",
    AutoOrder: "AutoOrder",
    ManualOrder: "ManualOrder",
    CancelOrder: "CancelOrder",
    QueryPrintParameter: "QueryPrintParameter",
    ObliqueLabelPrint: "ObliqueLabelPrint",
    BatchCancelOrder: "BatchCancelOrder",
    QueryOrderInfo: "QueryOrderInfo",
    SamsungOuterBoxLabelPrint: "SamsungOuterBoxLabelPrint",
}

export default class RecordExpressNumberRequestBody {

    actionType;
    serviceMode;
    payMode;
    expressNumber;
    materialLots;
    wayBillNumber;
    expressCompany;

    constructor(actionType){
        this.actionType = actionType;
    }

    static buildOldRecordExpress(documentLineList) {
        let body = new RecordExpressNumberRequestBody(ActionType.OldRecordOrder);
        body.documentLineList = documentLineList;
        return body;
    }

    static buildAutoRecordExpress(materialLots, serviceMode, payMode, orderTime) {
        let body = new RecordExpressNumberRequestBody(ActionType.AutoOrder);
        body.materialLots = materialLots;
        body.serviceMode = serviceMode;
        body.payMode = payMode;
        body.orderTime = orderTime;
        return body;
    }

    static buildManualRecordExpress(expressNumber, materialLots, expressCompany) {
        let body = new RecordExpressNumberRequestBody(ActionType.ManualOrder);
        body.expressNumber = expressNumber;
        body.materialLots = materialLots;
        body.expressCompany = expressCompany;
        return body;
    }

    static buildCancelRecordExpress(materialLots) {
        let body = new RecordExpressNumberRequestBody(ActionType.CancelOrder);
        body.materialLots = materialLots;
        return body;
    }

    static buildPrintObliqueLabel(materialLots) {
        let body = new RecordExpressNumberRequestBody(ActionType.QueryPrintParameter);
        body.materialLots = materialLots;
        return body;
    }
    
    static buildObliqueLabelPrint(materialLots) {
        let body = new RecordExpressNumberRequestBody(ActionType.ObliqueLabelPrint);
        body.materialLots = materialLots;
        return body;
    }
    
    static buildSamsungOuterBoxLabelPrint(documentLineList, printCount) {
        let body = new RecordExpressNumberRequestBody(ActionType.SamsungOuterBoxLabelPrint);
        body.documentLineList = documentLineList;
        body.printCount = printCount;
        return body;
    }
    
    static buildQueryWayBillNumber(wayBillNumber){
        let body = new RecordExpressNumberRequestBody(ActionType.QueryOrderInfo);
        body.wayBillNumber = wayBillNumber;
        return body;
    }

    static buildBatchCancelExpress(orderList){
        let body = new RecordExpressNumberRequestBody(ActionType.BatchCancelOrder);
        body.orderList = orderList;
        return body;
    }
}   

