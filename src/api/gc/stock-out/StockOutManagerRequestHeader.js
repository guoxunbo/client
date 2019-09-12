import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCStockOut";

export default class StockOutManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
