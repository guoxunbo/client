export default class ValidateDocumentLineRequestBody {

    documentLines;
    materialLot;

    constructor (documentLines, materialLot) {
        this.documentLines = documentLines;
        this.materialLot = materialLot;
    }

    static buildValidation (documentLines, materialLot){
        return new ValidateDocumentLineRequestBody (documentLines, materialLot);
    }
}