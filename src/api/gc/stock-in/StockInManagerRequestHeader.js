import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCStockIn";

export default class StockInManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
