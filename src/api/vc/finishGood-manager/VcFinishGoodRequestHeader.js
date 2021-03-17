import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "FinishGoodManager";

export default class VcFinishGoodRequestHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    }
}