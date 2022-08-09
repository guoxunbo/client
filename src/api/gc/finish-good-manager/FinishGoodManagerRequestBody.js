
const ActionType = {
    COMReceive: "COMReceive",
    WLTReceive: "WLTReceive",
    COBReceive: "COBReceive",
    LSGradeQuery: "LSGradeQuery",
    LSGradeReceive: "LSGradeReceive",
}

export default class FinishGoodManagerRequestBody {
    
    mesPackedLots;
    warehouseRrn;
    actionType;
    printLabel;

    constructor(mesPackedLots, warehouseRrn, actionType, printLabel){
        this.mesPackedLots = mesPackedLots;
        this.warehouseRrn = warehouseRrn;
        this.actionType = actionType;
        this.printLabel = printLabel;
    }

    /**
     * COM完成品接收
     * @param mesPackedLots 待接收的完成品
     * @param warehouseRrn 仓库
     */
    static buildCOMReceive(mesPackedLots, warehouseRrn) {
        return new FinishGoodManagerRequestBody(mesPackedLots, warehouseRrn, ActionType.COMReceive);
    }

    /**
     * WLT完成品接收
     * @param mesPackedLots 待接收的完成品
     * @param warehouseRrn 仓库
     */
    static buildWLTReceive(mesPackedLots, printLabel, printCount) {
        let body = new FinishGoodManagerRequestBody(mesPackedLots, undefined, ActionType.WLTReceive, printLabel);
        body.printCount = printCount;
        return body;
    }

    /**
     * COB完成品接收
     * @param mesPackedLots 待接收的完成品
     */
    static buildCOBReceive(mesPackedLots) {
        return new FinishGoodManagerRequestBody(mesPackedLots, undefined, ActionType.COBReceive);
    }

    static buildLSGeadeQuery(tableRrn) {
        let body =  new FinishGoodManagerRequestBody(undefined, undefined, ActionType.LSGradeQuery);
        body.tableRrn = tableRrn;
        return body;
    }

    static LSGeadeReceive(mesPackedLots) {
        return new FinishGoodManagerRequestBody(mesPackedLots, undefined, ActionType.LSGradeReceive);
    }
}

