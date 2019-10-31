import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCGetVboxPrintParamter";

export default class GetPrintVboxParameterRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
