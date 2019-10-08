export default class ValidationSoOrTestRequestBody {

    documentLine;
    materialLot;

    constructor(documentLine, materialLot){
        this.documentLine = documentLine;
        this.materialLot = materialLot;
    }
    
    static buildValidation(documentLine, materialLot) {
        return new ValidationSoOrTestRequestBody(documentLine, materialLot);
    }

}


