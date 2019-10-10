import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "GCFinishGoodManage";

export default class FinishGoodManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
