import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

export default class MaterialLotIqcRequestBody {
    constructor(materialLotAction) {
        this.materialLotAction = materialLotAction;
    }
    
    static buildBody(materialLotId, standardQty) {
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(materialLotId);
        materialLotAction.setTransQty(standardQty)
        return new MaterialLotIqcRequestBody(materialLotAction);
    }

}