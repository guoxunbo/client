const ActionType = {
    UpdateTreasuryNote: "UpdateTreasuryNote",
    Query: "Query",
    UpdateLocation: "UpdateLocation",
    HoldMaterialLot: "HoldMLot",
    ReleaseMaterialLot: "ReleaseMLot"
}

export default class MaterialLotUpdateRequestBody {

    treasuryeNote;
    materialLotList;
    materialLotId
    location;
    reason;
    remarks;

    constructor(actionType, treasuryeNote, materialLotList, materialLotId, location, reason, remarks){
        this.actionType = actionType;
        this.treasuryeNote = treasuryeNote;
        this.materialLotList = materialLotList;
        this.materialLotId = materialLotId;
        this.location = location;
        this.reason = reason;
        this.remarks = remarks;
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

    static buildHoldInfo(materialLotList, reason, remarks) {
        return new MaterialLotUpdateRequestBody(ActionType.HoldMaterialLot, undefined, materialLotList, undefined, undefined, reason, remarks);
    }
    
    static buildReleaseInfo(materialLotList, reason, remarks) {
        return new MaterialLotUpdateRequestBody(ActionType.ReleaseMaterialLot, undefined, materialLotList, undefined, undefined, reason, remarks);
    }
}