import { DefaultRowKey } from "@const/ConstDefine";

export default class CheckInventoryManagerRequestBody {

    existMaterialLots;
    errorMaterialLots;

    constructor(existMaterialLots, errorMaterialLots){
        this.existMaterialLots = existMaterialLots;
        this.errorMaterialLots = errorMaterialLots;
    }
    
    static checkInventory(object) {
        let errorMaterialLots = object.errorMaterialLots;
        errorMaterialLots.forEach(materialLot => {
            materialLot[DefaultRowKey] = undefined;
        });
        return new CheckInventoryManagerRequestBody(object.existMaterialLots, errorMaterialLots);
    }
}


