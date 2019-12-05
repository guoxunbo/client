import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "AsyncManager";

export default class AsyncManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
