import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCGetWltOrCpPrintParamter";

export default class GetPrintVboxParameterRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
