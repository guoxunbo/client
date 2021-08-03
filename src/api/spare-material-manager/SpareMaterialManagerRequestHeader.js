import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "SpareMaterialManage";

export default class SpareMaterialManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
