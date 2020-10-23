const ActionType = {
    Receive: "Receive",
}

export default class FtMLotManagerRequestBody {

    actionType;
    materialLotUnitList;

    constructor(actionType, materialLotUnitList){
        this.actionType = actionType;
        this.materialLotUnitList = materialLotUnitList;
    }
    
    static buildReceive(materialLotUnitList) {
        return new FtMLotManagerRequestBody(ActionType.Receive, materialLotUnitList);
    }
}


