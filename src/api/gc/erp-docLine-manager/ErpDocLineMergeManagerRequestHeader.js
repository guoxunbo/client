import RequestHeader from "../../RequestHeader";

const MESSAGE_NAME = "GCErpDocLineMergeManager";

export default class ErpDocLineMergeManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
