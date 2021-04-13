
const ActionType = {
    TapeScan: "TapeScan",
    TapeReceive: "TapeReceive",
    BladeScan: "BladeScan",
    GetBladeMLotId: "GetBladeMLotId",
    BladeReceive: "BladeReceive",
    MaterialSpare: "MaterialSpare",
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

    static buildQueryBladeTape(bladeMaterialCode) {
        let body = new RwMaterialManagerRequestBody(ActionType.BladeScan);
        body.bladeMaterialCode = bladeMaterialCode;
        return body;
    }

    static buildValidateAndGetMaterialLotId(materialLotCode) {
        let body = new RwMaterialManagerRequestBody(ActionType.GetBladeMLotId);
        body.materialLotCode = materialLotCode;
        return body;
    }

    static buildReceiveBlade(materialLotList){
        let body = new RwMaterialManagerRequestBody(ActionType.BladeReceive);
        body.materialLotList = materialLotList;
        return body;
    }

    static buildSpareMaterial(materialLotList) {
        let body = new RwMaterialManagerRequestBody(ActionType.MaterialSpare);
        body.materialLotList = materialLotList;
        return body;
    }

}


