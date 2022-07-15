const ActionType = {
    queryVbox : "queryVbox",
    printLable: "printLable"
}

export default class GetPrintVboxParameterRequestBody {

    actionType;
    mesPackedLots;

    constructor(actionType, mesPackedLots){
        this.actionType = actionType;
        this.mesPackedLots = mesPackedLots;
    }

    static buildQuery(mesPackedLots) {
        return new GetPrintVboxParameterRequestBody(ActionType.printLable, mesPackedLots);
    }

    static buildQueryVboxInfo(tableRrn, vboxId) {
        let body = new GetPrintVboxParameterRequestBody(ActionType.queryVbox);
        body.tableRrn = tableRrn;
        body.vboxId = vboxId;
        return body;
    }
}


