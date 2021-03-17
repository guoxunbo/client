import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "DeliveryOrderImport";

export default class VcDeliveryOrderRequestHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    }
}