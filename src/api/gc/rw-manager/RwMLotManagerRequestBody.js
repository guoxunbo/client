
const ActionType = {
    GetPrintParameter: "getPrintParameter",
}

export default class RwMLotManagerRequestBody {

    actionType;
    materialLotList;

    constructor(actionType, materialLotList){
        this.actionType = actionType;
        this.materialLotList = materialLotList;
    }

    static buildGetPrintParam(materialLotList) {
        return new RwMLotManagerRequestBody(ActionType.GetPrintParameter, materialLotList);
    }

}


