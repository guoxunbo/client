import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCGetWltBboxPrintParamter";

export default class GetPrintWltBboxParameterRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
