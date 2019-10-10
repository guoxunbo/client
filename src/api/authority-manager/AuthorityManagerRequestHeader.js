import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "AuthorityManage";

export default class AuthorityManagerRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }

}