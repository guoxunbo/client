import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "CreateOrderManager";

export default class CreateOrderRequestHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    }
}