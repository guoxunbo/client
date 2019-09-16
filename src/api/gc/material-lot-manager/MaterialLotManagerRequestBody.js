import MaterialLot from "../../dto/mms/MaterialLot";

const ActionType = {
    BindRelayBox: "BindRelayBox",
    UnbindRelayBox: "UnbindRelayBox",
    JudgePackedLot: "JudgePackedLot",
    GetPackCaseCheckList: "GetPackCaseCheckList"
}


export default class MaterialLotManagerRequestBody {

    materialLots;
    relayBoxId;
    actionType;
    checkList;

    constructor(actionType, materialLots, relayBoxId){
        this.actionType = actionType;
        this.materialLots = materialLots;
        this.relayBoxId = relayBoxId;
    }
    setCheckList(checkList) {
        this.checkList = checkList;
    }

    static buildGetJudgePackCaseItemList() {
        let materialLotManagerRequestBody = new MaterialLotManagerRequestBody(ActionType.GetPackCaseCheckList);
        return materialLotManagerRequestBody;
    }

    static buildJudgePackedMaterialLots(materialLots, checkList) {
        debugger;
        let materialLotManagerRequestBody = new MaterialLotManagerRequestBody(ActionType.JudgePackedLot, materialLots, undefined);
        materialLotManagerRequestBody.setCheckList(checkList);
        return materialLotManagerRequestBody;
    }

    static buildBindRelayBox(materialLots, relayBoxId) {
        return new MaterialLotManagerRequestBody(ActionType.BindRelayBox, materialLots, relayBoxId);
    }

    static buildUnbindRelayBox(materialLots) {
        return new MaterialLotManagerRequestBody(ActionType.UnbindRelayBox, materialLots);
    }

}   
export {JudgeGrade}
