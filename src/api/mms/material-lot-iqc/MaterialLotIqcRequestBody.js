import MaterialLotAction from "@api/dto/mms/MaterialLotAction";
import PropertyUtils from "@utils/PropertyUtils";

const ActionType = {
    ValidationAndGetMLot:'ValidationAndGetWaitIqcMLot',
    BatchIqc:'BatchIqc',
    IqcApproval:'IqcApproval',
}
export default class MaterialLotIqcRequestBody {

    actionType;
    materialLotIds;
    materialLotAction;
    urlRemark;

    constructor(materialLotAction, materialLotIds, materialLotActions, urlRemark) {
        this.materialLotAction = materialLotAction;
        this.materialLotIds = materialLotIds;
        this.materialLotActions = materialLotActions;
        this.urlRemark = urlRemark;
    }
    
    setActionType(actionType){
        this.actionType = actionType;
    }

    static buildIqc(materialLotCheckSheet) {
        let materialLotAction = new MaterialLotAction();
        PropertyUtils.copyProperties(materialLotCheckSheet, materialLotAction);
        return new MaterialLotIqcRequestBody(materialLotAction, undefined, undefined, materialLotCheckSheet.urlRemark);
    }

    /**
     * 验证并且获得待IQC物料
     * @param {*} materialLots 
     * @returns 
     */
    static buildValidationAndGetWaitIqcMLot(materialLots) {
        let materialLotIds = [];
        materialLots.forEach(data => {
            materialLotIds.push(data.materialLotId);
        });
        let materialLotIqcRequestBody =  new MaterialLotIqcRequestBody(undefined, materialLotIds);
        materialLotIqcRequestBody.setActionType(ActionType.ValidationAndGetMLot);
        return materialLotIqcRequestBody;
    }

    
    static buildBatchIqc(judgeMLotsAndAction) {
        let materialLotActions = [];
        judgeMLotsAndAction.forEach(data => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(data.materialLotId);
            materialLotAction.setActionCode(judgeMLotsAndAction.actionCode);
            materialLotAction.setActionReason(judgeMLotsAndAction.actionReason);
            materialLotAction.setActionComment(judgeMLotsAndAction.actionComment);
            materialLotActions.push(materialLotAction);
        });
        
        let materialLotIqcRequestBody =  new MaterialLotIqcRequestBody(undefined, undefined, materialLotActions, judgeMLotsAndAction.urlRemark);
        materialLotIqcRequestBody.setActionType(ActionType.BatchIqc);
        return materialLotIqcRequestBody;
    }

    /**
     * iqc审核
     * @param {*} actionObject 
     * @param {*} formObjectList 操作对象的集合
     * @returns 
     */
    static buildIqcApproval(actionObject, formObjectList) {
        let materialLotActions = [];
        formObjectList.forEach(data => {
            let materialLotAction = new MaterialLotAction();
            PropertyUtils.copyProperties(actionObject, materialLotAction);
            materialLotAction.setMaterialLotId(data.materialLotId);
            materialLotActions.push(materialLotAction);
        });
        let materialLotIqcRequestBody =  new MaterialLotIqcRequestBody(undefined, undefined, materialLotActions, undefined);
        materialLotIqcRequestBody.setActionType(ActionType.IqcApproval);
        return materialLotIqcRequestBody;
    }
}