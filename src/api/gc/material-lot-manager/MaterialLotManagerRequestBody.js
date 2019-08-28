import MaterialLot from "../../dto/mms/MaterialLot";

const ActionType = {
    BindRelayBox: "BindRelayBox",
    UnbindRelayBox: "UnbindRelayBox",
    JudgePackedLot: "JudgePackedLot",
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

    static buildJudgePackedMaterialLots(packedLotDetails, judgeGrade, judgeCode) {
        let materialLots = [];
        packedLotDetails.forEach(packedLotDetail => {
            let existLot = materialLots.find(materialLot => materialLot.materialLotId === packedLotDetail.packagedLotId);
            if (!existLot) {
                let materialLot = new MaterialLot();
                materialLot.setMaterialLotId(packedLotDetail.packagedLotId);
                materialLots.push(materialLot);
            } 
        });
        let materialLotManagerRequestBody = new MaterialLotManagerRequestBody(ActionType.JudgePackedLot, Array.from(new Set(materialLots)), undefined);
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

