const ActionType = {
    QueryPrintParameter: "QueryPrintParameter"
}

export default class GetPrintWltCpRequestBody {

    actionType;
    materialLot;

    constructor(actionType, materialLot){
        this.actionType = actionType;
        this.materialLot = materialLot;
    }

    static buildQueryPrintParameter(materialLot) {
        debugger;
        return new GetPrintWltCpRequestBody(ActionType.QueryPrintParameter, materialLot);
    }

}