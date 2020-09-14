export default class GetMLotCodePrintParameterRequestBody {
    
    printType;
    materialLot;

    constructor(printType, materialLot){
        this.printType = printType;
        this.materialLot = materialLot;
    }

    static buildGetPrintParameter(printType, materialLot) {
        return new GetMLotCodePrintParameterRequestBody(printType, materialLot);
    }
}


