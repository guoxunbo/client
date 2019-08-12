import RequestHeader from "../RequestHeader";
const MESSAGE_NAME = "RefListManage";

export default class RefListManagerRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }
    
}
