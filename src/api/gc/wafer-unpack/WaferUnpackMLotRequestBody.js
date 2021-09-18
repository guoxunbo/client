const ActionType = {
    WaferUnpack: "WaferUnpack",
} 

export default class WaferUnpackMLotRequestBody {

    actionType;
    materialLotUnits;

    constructor(actionType, materialLotUnits){
        this.actionType = actionType;
        this.materialLotUnits = materialLotUnits;
    }

    static buildWaferUnpack(materialLotUnits) {
        return new WaferUnpackMLotRequestBody(ActionType.WaferUnpack, materialLotUnits);
    }

}