export default class ValidationMaterialRequestBody{
    materialLotFirst;
    materialLot;

    constructor(materialLotFirst, materialLot){
        this.materialLotFirst = materialLotFirst;
        this.materialLot = materialLot;
    }
    
    static buildValidation(materialLotFirst, materialLot) {
        return new ValidationMaterialRequestBody(materialLotFirst, materialLot);
    }
}