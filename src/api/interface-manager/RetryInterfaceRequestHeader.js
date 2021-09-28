import RequestHeader from "@api/RequestHeader";

const MESSAGE_NAME = "RetryInterfaceManager";

export default class RetryInterfaceRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
