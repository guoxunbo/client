import RequestHeader from "../../RequestHeader";

const MESSAGE_NAME = "GCIncomingDelete";

export default class IncomingDeleteRequestHeader extends RequestHeader {

    constructor() {
        super(MESSAGE_NAME);
    }

}