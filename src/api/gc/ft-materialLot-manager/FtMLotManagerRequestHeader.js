import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCFtMLotManager";

export default class FtMLotManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
