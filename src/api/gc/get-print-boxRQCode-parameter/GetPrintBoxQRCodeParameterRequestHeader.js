import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCGetBoxQRCodePrintParamter";

export default class GetPrintBoxQRCodeParameterRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
