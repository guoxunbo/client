import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

export default class MaterialLotOqcRequestHeader {

    actionType;
    materialLotIds;
    materialLotAction;

    constructor(materialLotAction, materialLotIds, materialLotActions) {
        this.materialLotAction = materialLotAction;
        this.materialLotIds = materialLotIds;
        this.materialLotActions = materialLotActions;
    }
    
    static buildOqc(materialLotCheckSheet) {
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(materialLotCheckSheet.materialLotId);
        materialLotAction.setActionCode(materialLotCheckSheet.actionCode);
        materialLotAction.setActionReason(materialLotCheckSheet.actionReason);
        materialLotAction.setActionComment(materialLotCheckSheet.actionComment);
        return new MaterialLotOqcRequestHeader(materialLotAction);
    }
}