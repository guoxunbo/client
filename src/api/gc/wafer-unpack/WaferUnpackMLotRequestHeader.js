import RequestHeader from "../../RequestHeader";

const MESSAGE_NAME = "GCWeight";

export default class WaferUnpackMLotRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}