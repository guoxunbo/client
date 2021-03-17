import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

export default class MaterialLotSplitRequestBody {

    materialLotAction;
    
    constructor(materialLotAction){
        this.materialLotAction = materialLotAction;
    }

    static buildSplitMaterialLot(waitSplitMLotAndAction){
        waitSplitMLotAndAction;
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(waitSplitMLotAndAction.materialLotId);
        materialLotAction.setTransQty(waitSplitMLotAndAction.transQty);
        materialLotAction.setActionComment(waitSplitMLotAndAction.actionComment);
        return new MaterialLotSplitRequestBody(materialLotAction);
    }

}