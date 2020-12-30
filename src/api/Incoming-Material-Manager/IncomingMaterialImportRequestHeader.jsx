import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "IncomingMaterialImportManager";

export default class IncomingMaterialImportRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}