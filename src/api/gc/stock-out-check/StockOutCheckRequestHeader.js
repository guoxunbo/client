import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "StockOutCheck";

export default class StockOutCheckRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
