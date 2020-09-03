import RequestHeader from "../../RequestHeader";

const MESSAGE_NAME = "PartsMaterialManage";

export default class PartsMaterialManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
