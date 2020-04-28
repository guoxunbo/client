const ActionType = {
    UpdateTreasuryNote: "UpdateTreasuryNote",
    Query: "Query",
    UpdateLocation: "UpdateLocation"
}

export default class MaterialLotUpdateRequestBody {

    treasuryeNote;
    materialLotList;
    materialLotId
    location;

    constructor(actionType, treasuryeNote, materialLotList, materialLotId, location){
        this.actionType = actionType;
        this.treasuryeNote = treasuryeNote;
        this.materialLotList = materialLotList;
        this.materialLotId = materialLotId;
        this.location = location;
    }

    static buildUpdateInfo(treasuryeNote, materialLotList) {
        return new MaterialLotUpdateRequestBody(ActionType.UpdateTreasuryNote, treasuryeNote, materialLotList);
    }

    static buildQuery(materialLotId) {
        return new MaterialLotUpdateRequestBody(ActionType.Query, undefined, undefined, materialLotId);
    }

    static buildUpdateLocationInfo(location, materialLotList) {
        return new MaterialLotUpdateRequestBody(ActionType.UpdateLocation, undefined, materialLotList, undefined, location);
    }
}