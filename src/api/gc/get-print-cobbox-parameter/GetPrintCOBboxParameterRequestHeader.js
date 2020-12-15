import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCGetCOBboxPrintParamter";

export default class GetPrintCOBboxParameterRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
