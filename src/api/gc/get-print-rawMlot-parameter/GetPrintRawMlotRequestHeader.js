import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCGetRawMlotPrintParamter";

export default class GetPrintRawMlotRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
