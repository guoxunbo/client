export default class GetPrintCOBboxParameterRequestBody {

    materialLot;
    printCount;

    constructor(materialLot, printCount){
        this.materialLot = materialLot;
        this.printCount = printCount;
    }

    static buildQuery(materialLot, printCount) {
        return new GetPrintCOBboxParameterRequestBody(materialLot, printCount);
    }

}


