import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "StockOutManager";

export default class VcStockOutRequestHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    }
}