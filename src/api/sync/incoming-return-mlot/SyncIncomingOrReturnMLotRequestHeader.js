import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "SyncIncomingOrReturn";

export default class SyncIncomingOrReturnMLotRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}