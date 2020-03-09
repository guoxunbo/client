import RequestHeader from "../../RequestHeader";

const MESSAGE_NAME = "GCIncomingImport";

export default class IncomingImportRequestHeader extends RequestHeader {

    constructor() {
        super(MESSAGE_NAME);
    }

}