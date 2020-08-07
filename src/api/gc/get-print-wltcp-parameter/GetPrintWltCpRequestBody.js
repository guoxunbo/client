export default class GetPrintWltCpRequestBody {

    lotId;

    constructor(lotId){
        this.lotId = lotId;
    }

    static buildQuery(lotId) {
        return new GetPrintWltCpRequestBody(lotId);
    }

}