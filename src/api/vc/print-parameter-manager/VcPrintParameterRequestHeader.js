import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "PrintParameterManager";

export default class VcPrintParameterRequestHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    }
}