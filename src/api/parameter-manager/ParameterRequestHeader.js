import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "ParameterManage";

export default class ParameterRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }

}