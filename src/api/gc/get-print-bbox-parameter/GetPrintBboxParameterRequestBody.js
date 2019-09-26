export default class GetPrintBboxParameterRequestBody {

    materialLotRrn;

    constructor(materialLotRrn){
        this.materialLotRrn = materialLotRrn;
    }

    static buildQuery(materialLotRrn) {
        return new GetPrintBboxParameterRequestBody(materialLotRrn);
    }

}


