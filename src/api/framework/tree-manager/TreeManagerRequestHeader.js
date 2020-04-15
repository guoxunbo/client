import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "TreeManage";

export default class TreeManagerRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }

}