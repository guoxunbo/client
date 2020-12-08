import RequestHeader from "../../RequestHeader";

const MESSAGE_NAME = "GCRawMaterialManager";

export default class GCRawMaterialImportRequestHeader extends RequestHeader {

    constructor() {
        super(MESSAGE_NAME);
    }

}