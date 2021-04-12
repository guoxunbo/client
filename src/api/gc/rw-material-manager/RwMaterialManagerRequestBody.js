
const ActionType = {
    TapeScan: "TapeScan",
    TapeReceive: "TapeReceive",
}

export default class RwMaterialManagerRequestBody {

    actionType;

    constructor(actionType){
        this.actionType = actionType;
    }

    static buildGetMaterialLotByTapeCode(tapeMaterialCode) {
        let body = new RwMaterialManagerRequestBody(ActionType.TapeScan);
        body.tapeMaterialCode = tapeMaterialCode;
        return body;
    }

    static buildReceiveTape(materialLotList) {
        let body = new RwMaterialManagerRequestBody(ActionType.TapeReceive);
        body.materialLotList = materialLotList;
        return body;
    }

}


