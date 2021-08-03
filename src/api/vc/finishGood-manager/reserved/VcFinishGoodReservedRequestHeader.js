import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "FinishGoodReservedManager";

export default class VcFinishGoodReservedRequestHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    }
}