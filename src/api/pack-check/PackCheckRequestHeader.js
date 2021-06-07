import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "PackCheck";

export default class PackCheckRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }

}