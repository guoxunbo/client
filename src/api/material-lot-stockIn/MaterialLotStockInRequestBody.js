export default class MaterialLotStockInRequestBody {

    materialLots;
    materialLotActionList;
    
    constructor(materialLots, materialLotActionList){
        this.materialLots = materialLots;
        this.materialLotActionList = materialLotActionList;
    }

    /**
     * 接收物料批次并入库
     * @param object 
     * @example {materialLots:[{? extend MaterialLot}], materialLotActionList: [{? extend MaterialLotAction}}]
     */
    static buildStockIn(object) {
        return new MaterialLotStockInRequestBody(object.materialLots, object.materialLotActionList);
    }

}