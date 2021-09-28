import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "ScrapMLotManager";

export default class ScrapMLotRequestHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    }
}