import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "mobileManager";

export default class MobileRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }

}