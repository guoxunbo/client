import RequestHeader from "@api/RequestHeader";

const MESSAGE_NAME = "AnalyseManage";
export default class DynaxAnalyseRequestHeader extends RequestHeader {

    constructor() {  
        super(MESSAGE_NAME);
    }
}