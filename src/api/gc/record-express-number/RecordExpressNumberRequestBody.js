
export default class RecordExpressNumberRequestBody {

    deliveryOrderList;

    constructor(deliveryOrderList){
        this.deliveryOrderList = deliveryOrderList;
    }

    static buildRecordExpressNumber(deliveryOrderList) {
        return new RecordExpressNumberRequestBody(deliveryOrderList);
    }

}

