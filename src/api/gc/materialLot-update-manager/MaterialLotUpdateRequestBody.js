const ActionType = {
    UpdateTreasuryNote: "UpdateTreasuryNote",
}

export default class MaterialLotUpdateRequestBody {

    treasuryeNote;
    materialLotList;

    constructor(actionType, treasuryeNote, materialLotList){
        this.actionType = actionType;
        this.treasuryeNote = treasuryeNote;
        this.materialLotList = materialLotList;
    }

    static buildUpdateInfo(treasuryeNote, materialLotList) {
        return new MaterialLotUpdateRequestBody(ActionType.UpdateTreasuryNote, treasuryeNote, materialLotList);
    }

}