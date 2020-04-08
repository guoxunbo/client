export default class GetPrintWltBboxParameterRequestBody {

    materialLotRrn;

    constructor(materialLotRrn){
        this.materialLotRrn = materialLotRrn;
    }

    static buildQuery(materialLotRrn) {
        return new GetPrintWltBboxParameterRequestBody(materialLotRrn);
    }

}


