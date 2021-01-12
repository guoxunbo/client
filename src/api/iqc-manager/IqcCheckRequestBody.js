import MaterialLotJudgeAction from "@api/dto/mms/MaterialLotJudgeAction";

const ActionType = {
    IqcCheck: "IqcCheck",
    GetMLotCheckSheetLine:"GetMLotCheckSheetLine",
}

export default class IqcCheckRequestBody {

    actionType;
    materialLotJudgeAction;
    checkSheetRrn;

    constructor(actionType, materialLotJudgeAction, checkSheetRrn){
        this.actionType = actionType;
        this.materialLotJudgeAction = materialLotJudgeAction;
        this.checkSheetRrn = checkSheetRrn;
    }

    static buildIQC(object) {
        let materialLotJudgeAction = new MaterialLotJudgeAction();
        materialLotJudgeAction.setMaterialLotId(object.materialLotId);
        materialLotJudgeAction.setJudgeResult(object.judgeResult);
        return new IqcCheckRequestBody(ActionType.IqcCheck, materialLotJudgeAction);
    }

    static buildGetMLotCheckSheetLine(object){
        return new IqcCheckRequestBody(ActionType.GetMLotCheckSheetLine, undefined, object.mLotCheckSheetRrn);
    }
}

