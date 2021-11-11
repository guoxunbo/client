
const ActionType = {
    updateRmaNo: "updateRmaNo"
}
export default class UpdateMLotRequestBody {

    actionType;
    materialLotList;
    materialLotAction;
    
    constructor(actionType, materialLotList, materialLotAction){
        this.actionType = actionType;
        this.materialLotList = materialLotList;
        this.materialLotAction = materialLotAction;
    }

    static buildAddRmaNoRequest(materialLotList, materialLotAction) {
        return new UpdateMLotRequestBody(ActionType.updateRmaNo, materialLotList, materialLotAction);
    }
    
}