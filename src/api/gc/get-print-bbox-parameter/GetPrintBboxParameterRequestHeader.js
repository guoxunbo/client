import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "GCGetBboxPrintParamter";

export default class GetPrintBboxParameterRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
