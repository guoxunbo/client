import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

const actionType={
    PackCheck: "PackCheck",
}
export default class PackCheckRequestBody {
    
    actionType;
    materialLotAction;

    constructor(actionType, materialLotAction) {
        this.actionType = actionType;
        this.materialLotAction = materialLotAction;
    }

    static buildPackCheck(packCheckAction) {
        let {actionCode, actionReason, actionComment, materialLotId} = packCheckAction;
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(materialLotId)
        materialLotAction.setActionCode(actionCode);
        materialLotAction.setActionReason(actionReason);
        materialLotAction.setActionComment(actionComment);
        return new PackCheckRequestBody(actionType.PackCheck, materialLotAction);
    }
}