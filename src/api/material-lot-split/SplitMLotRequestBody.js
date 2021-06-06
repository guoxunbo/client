import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

export default class SplitMLotRequestBody {

    materialLotAction;
    
    constructor(materialLotAction){
        this.materialLotAction = materialLotAction;
    }

    static buildSplitMLot(spiltAction){
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(spiltAction.materialLotId);
        materialLotAction.setTransQty(spiltAction.transQty);
        materialLotAction.setActionComment(spiltAction.actionComment);
        return new SplitMLotRequestBody(materialLotAction);
    }    
}