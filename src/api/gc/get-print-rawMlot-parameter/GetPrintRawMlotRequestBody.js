const ActionType = {
    RawPrint: "RawPrint",
    IRABoxPrint: "IRABoxPrint",
}

export default class GetPrintRawMlotRequestBody {
    
    actionType;
    materialLots;

    constructor(actionType,materialLots){
        this.actionType = actionType;
        this.materialLots = materialLots;
    }

    static buildGetPrintParam(materialLots) {
        return new GetPrintRawMlotRequestBody(ActionType.RawPrint, materialLots);
    }

    static buildGetIRABoxPrintParam(materialLots) {
        return new GetPrintRawMlotRequestBody(ActionType.IRABoxPrint, materialLots);
    }

}


