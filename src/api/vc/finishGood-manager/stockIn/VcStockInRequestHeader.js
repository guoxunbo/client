import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "StockInFinishGood";

export default class VcStockInRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
