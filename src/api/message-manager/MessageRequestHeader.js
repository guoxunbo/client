import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "MessageManage";

export default class MessageRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }

}