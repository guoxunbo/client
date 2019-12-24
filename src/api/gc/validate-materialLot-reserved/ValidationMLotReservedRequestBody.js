export default class ValidationMLotReservedRequestBody{
    materialLot;

    constructor(materialLot){
        this.materialLot = materialLot;
    }
    
    static buildValidation(materialLot) {
        return new ValidationMLotReservedRequestBody(materialLot);
    }
}