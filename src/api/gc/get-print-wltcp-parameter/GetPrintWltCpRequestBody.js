const ActionType = {
    QueryPrintParameter: "QueryPrintParameter"
}

export default class GetPrintWltCpRequestBody {

    actionType;
    materialLot;
    printCount;

    constructor(actionType, materialLot, printCount){
        this.actionType = actionType;
        this.materialLot = materialLot;
        this.printCount = printCount;
    }

    static buildQueryPrintParameter(materialLot, printCount) {
        return new GetPrintWltCpRequestBody(ActionType.QueryPrintParameter, materialLot, printCount);
    }

}