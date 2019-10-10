import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

export default class UnPackageMaterialLotRequestBody {
    materialLotActions;

    constructor(materialLotActions) {
        this.materialLotActions = materialLotActions;
    }
    
    /**
     * 拆包
     * @param {? extends MaterialLot} packedLotDetails 需要拆的包装详情
     * @param {*} actionCode 
     * @param {*} actionReason 
     * @param {*} actionComment 
     */
    static buildUnPackMaterialLot(packedLotDetails, actionCode, actionReason, actionComment) {
        let materialLotActions = [];
        packedLotDetails.forEach(packedLotDetail => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(packedLotDetail.materialLotId);
            materialLotAction.setTransQty(packedLotDetail.currentQty);
            materialLotAction.setActionCode(actionCode);
            materialLotAction.setActionReason(actionReason);
            materialLotAction.setActionComment(actionComment);
            materialLotActions.push(materialLotAction);
        });
        return new UnPackageMaterialLotRequestBody(materialLotActions);
    }

}