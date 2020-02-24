import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCWaferManager";

export default class WaferManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
