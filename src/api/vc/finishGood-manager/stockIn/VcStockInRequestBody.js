export default class VcStockInRequestBody {

    materialLots;
    materialLotActionList;
    
    constructor(materialLots, materialLotActionList){
        this.materialLots = materialLots;
        this.materialLotActionList = materialLotActionList;
    }
    
    static buildStockIn(object) {
        return new VcStockInRequestBody(object.materialLots, object.materialLotActionList);
    }

}