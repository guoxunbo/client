
const ActionType = {
    OldRecordOrder: "OldRecordOrder",
    AutoOrder: "AutoOrder",
    ManualOrder: "ManualOrder",
    CancelOrder: "CancelOrder"
}

export default class RecordExpressNumberRequestBody {

    actionType;
    serviceMode;
    payMode;
    expressNumber;
    materialLots;

    constructor(actionType){
        this.actionType = actionType;
    }

    static buildOldRecordExpress(deliveryOrderList) {
        let body = new RecordExpressNumberRequestBody(ActionType.OldRecordOrder);
        body.deliveryOrderList = deliveryOrderList;
        return body;
    }

    static buildAutoRecordExpress(materialLots, serviceMode, payMode) {
        let body = new RecordExpressNumberRequestBody(ActionType.AutoOrder);
        body.materialLots = materialLots;
        body.serviceMode = serviceMode;
        body.payMode = payMode;
        return body;
    }

    static buildManualRecordExpress(expressNumber, materialLots) {
        let body = new RecordExpressNumberRequestBody(ActionType.ManualOrder);
        body.expressNumber = expressNumber;
        body.materialLots = materialLots;
        return body;
    }

    static buildCancelRecordExpress(materialLots) {
        let body = new RecordExpressNumberRequestBody(ActionType.CancelOrder);
        body.materialLots = materialLots;
        return body;
    }
}   

