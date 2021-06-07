export default class GetPrintWltBboxParameterRequestBody {

    materialLotRrn;
    printCount;

    constructor(materialLotRrn, printCount){
        this.materialLotRrn = materialLotRrn;
        this.printCount = printCount;
    }

    static buildQuery(materialLotRrn, printCount) {
        return new GetPrintWltBboxParameterRequestBody(materialLotRrn, printCount);
    }

}


