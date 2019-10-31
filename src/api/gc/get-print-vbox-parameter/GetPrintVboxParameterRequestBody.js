export default class GetPrintVboxParameterRequestBody {

    mesPackedLots;

    constructor(mesPackedLots){
        this.mesPackedLots = mesPackedLots;
    }

    static buildQuery(mesPackedLots) {
        return new GetPrintVboxParameterRequestBody(mesPackedLots);
    }

}


