import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "CheckMLotManager";

export default class CheckMLotRequestHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    }
}