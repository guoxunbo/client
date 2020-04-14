import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCGetWltBoxPrintParamter";

export default class GetPrintWltBoxParameterRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
