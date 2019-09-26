import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCGetBboxPrintParamter";

export default class GetPrintBboxParameterRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
