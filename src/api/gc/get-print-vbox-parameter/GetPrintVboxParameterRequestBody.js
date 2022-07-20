const ActionType = {
    printLable: "printLable"
}

export default class GetPrintVboxParameterRequestBody {

    actionType;
    materialLotList;

    constructor(actionType, materialLotList){
        this.actionType = actionType;
        this.materialLotList = materialLotList;
    }

    static buildPrintLabel(materialLotList) {
        return new GetPrintVboxParameterRequestBody(ActionType.printLable, materialLotList);
    }
}


