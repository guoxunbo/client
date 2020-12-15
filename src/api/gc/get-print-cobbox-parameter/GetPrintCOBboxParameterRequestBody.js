export default class GetPrintCOBboxParameterRequestBody {

    materialLot;

    constructor(materialLot){
        this.materialLot = materialLot;
    }

    static buildQuery(materialLot) {
        return new GetPrintCOBboxParameterRequestBody(materialLot);
    }

}


