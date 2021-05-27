export default class GetPrintBboxParameterRequestBody {

    materialLotRrn;
    printCount;

    constructor(materialLotRrn, printCount){
        this.materialLotRrn = materialLotRrn;
        this.printCount = printCount;
    }

    static buildQuery(materialLotRrn, printCount) {
        return new GetPrintBboxParameterRequestBody(materialLotRrn, printCount);
    }

}


