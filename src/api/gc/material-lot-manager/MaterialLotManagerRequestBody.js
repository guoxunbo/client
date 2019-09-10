import MaterialLot from "../../dto/mms/MaterialLot";

const ActionType = {
    BindRelayBox: "BindRelayBox",
    UnbindRelayBox: "UnbindRelayBox",
    JudgePackedLot: "JudgePackedLot",
}
const JudgeGrade = {
    Pass: "Pass",
    Ng: "Ng"
}

export default class MaterialLotManagerRequestBody {

    materialLots;
    relayBoxId;
    actionType;
    judgeCode;
    judgeGrade;

    constructor(actionType, materialLots, relayBoxId){
        this.actionType = actionType;
        this.materialLots = materialLots;
        this.relayBoxId = relayBoxId;
    }

    setJudgeCode(judgeCode) {
        this.judgeCode = judgeCode;
    }

    setJudgeGrade(judgeGrade) {
        this.judgeGrade = judgeGrade;
    }

    static buildJudgePackedMaterialLots(materialLots, judgeGrade, judgeCode) {
        let materialLotManagerRequestBody = new MaterialLotManagerRequestBody(ActionType.JudgePackedLot, materialLots, undefined);
        materialLotManagerRequestBody.setJudgeCode(judgeCode);
        materialLotManagerRequestBody.setJudgeGrade(judgeGrade);
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
