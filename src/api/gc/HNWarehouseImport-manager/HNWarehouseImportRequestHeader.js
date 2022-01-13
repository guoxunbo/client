import RequestHeader from "../../RequestHeader";

const MESSAGE_NAME = "GCHNWarehouseImport";

export default class HNWarehouseImportRequestHeader extends RequestHeader {

    constructor() {
        super(MESSAGE_NAME);
    }

}