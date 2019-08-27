import MaterialLot from "../dto/mms/MaterialLot";
import MaterialLotAction from "../dto/mms/MaterialLotAction";
import PropertyUtils from "../utils/PropertyUtils";


export default class MaterialLotStockInRequestBody {

    materialLots;
    materialLotAction;
    
    constructor(materialLots, materialLotAction){
        this.materialLots = materialLots;
        this.materialLotAction = materialLotAction;
    }

    /**
     * 接收物料批次并入库
     * @param object 
     * @example {materialLots:[{? extend MaterialLot}], materialLotAction: {? extend MaterialLotAction}}
     */
    static buildStockIn(object) {
        return new MaterialLotStockInRequestBody(object.materialLots, object.materialLotAction);
    }

}