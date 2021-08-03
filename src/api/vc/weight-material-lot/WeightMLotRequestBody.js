
export default class WeightMLotRequestBody {

    materialLotId;
    grossWeight;
    cartonSize
    
    constructor(materialLotId, grossWeight, cartonSize){
        this.materialLotId = materialLotId;
        this.grossWeight = grossWeight;
        this.cartonSize = cartonSize;
    }

    static buildWeightMaterialLot(materialLotId, grossWeight, cartonSize) {
        return new WeightMLotRequestBody(materialLotId, grossWeight, cartonSize);
    }
    
}