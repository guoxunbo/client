import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCRMAMLotManager";

export default class RmaMLotManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
