import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "RefTableManage";

export default class RefTableManagerRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }
    
}
