import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "FinishGoodReceiveManager";

export default class VcFinishGoodReceiveRequestHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    }
}