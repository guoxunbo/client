import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

export default class MaterialLotIqcRequestBody {
    constructor(materialLotAction) {
        this.materialLotAction = materialLotAction;
    }
    
    static buildIqc(materialLotCheckSheet) {
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(materialLotCheckSheet.materialLotId);
        materialLotAction.setActionCode(materialLotCheckSheet.actionCode);
        materialLotAction.setActionReason(materialLotCheckSheet.actionReason);
        materialLotAction.setActionComment(materialLotCheckSheet.actionComment);
        return new MaterialLotIqcRequestBody(materialLotAction);
    }

}