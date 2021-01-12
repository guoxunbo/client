//物料批次判定动作
export default class MaterialLotJudgeAction {

    materialLotId;
    judgeResult;
    actionCode;
    actionReason;
    actionComments;

    setMaterialLotId(materialLotId){
        this.materialLotId = materialLotId;
    }

    setJudgeResult(judgeResult){
        this.judgeResult = judgeResult;
    }

    setActionCode(actionCode){
        this.actionCode = actionCode;
    }

    setActionReason(actionReason){
        this.actionReason = actionReason;
    }

    setActionComments(actionComments){
        this.actionComments = actionComments;
    }
}