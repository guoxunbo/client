const ActionType = {
    UpdateTreasuryNote: "UpdateTreasuryNote",
    Query: "Query",
    UpdateLocation: "UpdateLocation",
    HoldMaterialLot: "HoldMLot"
}

export default class MaterialLotUpdateRequestBody {

    treasuryeNote;
    materialLotList;
    materialLotId
    location;
    holdReason;
    remarks;

    constructor(actionType, treasuryeNote, materialLotList, materialLotId, location, holdReason, remarks){
        this.actionType = actionType;
        this.treasuryeNote = treasuryeNote;
        this.materialLotList = materialLotList;
        this.materialLotId = materialLotId;
        this.location = location;
        this.holdReason = holdReason;
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

    static buildHoldInfo(materialLotList, holdReason, remarks) {
        return new MaterialLotUpdateRequestBody(ActionType.HoldMaterialLot, undefined, materialLotList, undefined, undefined, holdReason, remarks);
    }
    
}