import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "DeliverOrderManager";

export default class VcDeliveryOrderRequestHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    }
}