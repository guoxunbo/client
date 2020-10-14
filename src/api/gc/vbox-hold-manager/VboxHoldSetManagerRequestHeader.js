import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "VboxHoldSetManage";

export default class VboxHoldSetManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
