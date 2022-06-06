const ActionType = {
    WltBboxLabel: "WltBboxLabel",
    WaferLabel: "WaferLabel"
}

export default class GetPrintWltBoxParameterRequestBody {

    materialLotUnitList;
    actionType;

    constructor(materialLotUnitList, actionType){
        this.materialLotUnitList = materialLotUnitList;
        this.actionType = actionType;
    }

    static buildQuery(materialLotUnitList) {
        return new GetPrintWltBoxParameterRequestBody(materialLotUnitList, ActionType.WltBboxLabel);
    }

    static buildWaferPrint(materialLotUnitList) {
        return new GetPrintWltBoxParameterRequestBody(materialLotUnitList, ActionType.WaferLabel);
    }

}


