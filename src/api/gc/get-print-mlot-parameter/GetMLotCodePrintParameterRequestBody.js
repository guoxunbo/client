export default class GetMLotCodePrintParameterRequestBody {
    
    printType;
    materialLotList;

    constructor(printType, materialLotList){
        this.printType = printType;
        this.materialLotList = materialLotList;
    }

    static buildGetPrintParameter(printType, materialLotList) {
        return new GetMLotCodePrintParameterRequestBody(printType, materialLotList);
    }
}


