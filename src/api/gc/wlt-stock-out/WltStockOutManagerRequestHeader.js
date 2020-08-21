import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCWltStockOut";

export default class WltStockOutManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
