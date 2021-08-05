import MaterialLot from "@api/dto/mms/MaterialLot";
import MaterialLotAction from "@api/dto/mms/MaterialLotAction";
import PropertyUtils from "@utils/PropertyUtils";

const ActionType = {
    Receive2Warehouse: "Receive2Warehouse",
    Consume: "Consume",
    Print: "PrintLabel"

}

export default class MaterialLotManagerRequestBody {

    actionType;
    material;
    materialLotAction;
    validationPrintFlag;

    setValidationPrintFlag(validationPrintFlag){
        this.validationPrintFlag = validationPrintFlag;
    }

    constructor(actionType, materialLot, materialLotAction){
        this.actionType = actionType;
        this.materialLot = materialLot;
        this.materialLotAction = materialLotAction;
    }

    /**
     * 接收物料批次并入库
     * @param formObject 接收表单对象，页面显示的栏位如果需要保存到后台，都要在materialAction中体现
     */
    static buildReceiveMaterialLot(formObject) {
        let materialLot = new MaterialLot();
        PropertyUtils.copyProperties(formObject, materialLot);

        let materialLotAction = new MaterialLotAction();
        PropertyUtils.copyProperties(formObject, materialLotAction);
        return new MaterialLotManagerRequestBody(ActionType.Receive2Warehouse, materialLot, materialLotAction);
    }

    static buildPrintMLot(formObject, validationPrintFlag) {
        let materialLot = new MaterialLot();
        PropertyUtils.copyProperties(formObject, materialLot);

        let materialLotAction = new MaterialLotAction();
        PropertyUtils.copyProperties(formObject, materialLotAction);

        let requestBody = new MaterialLotManagerRequestBody(ActionType.Print, materialLot, materialLotAction);
        requestBody.setValidationPrintFlag(validationPrintFlag);
        return requestBody;
    }

    /**
     * 处理物料批次相关请求。
     * @param actionObject 
     * @example {action: ActionType.Consume, print materialLotAction: {transQty, actionCode...}, materialLotId: "111"}
     */
    static buildHandleMaterialLot(actionObject) {
        let materialLot = actionObject.materialLot;

        let materialLotAction = new MaterialLotAction();
        PropertyUtils.copyProperties(actionObject.materialLotAction, materialLotAction);
        return new MaterialLotManagerRequestBody(actionObject.action, materialLot, materialLotAction);
    }
}

export {ActionType};
