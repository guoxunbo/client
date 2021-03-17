import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

export default class MaterialLotOqcRequestBody {
    constructor(materialLotAction) {
        this.materialLotAction = materialLotAction;
    }
    
    static buildOqc(materialLotCheckSheet) {
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(materialLotCheckSheet.materialLotId);
        materialLotAction.setActionCode(materialLotCheckSheet.actionCode);
        materialLotAction.setActionReason(materialLotCheckSheet.actionReason);
        materialLotAction.setActionComment(materialLotCheckSheet.actionComment);
        return new MaterialLotOqcRequestBody(materialLotAction);
    }

}