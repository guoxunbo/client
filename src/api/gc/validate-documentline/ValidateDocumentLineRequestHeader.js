import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "ValidationDocumentLine";

export default class ValidateDocumentLineRequestHeader extends RequestHeader {

    constructor() {
        super(MESSAGE_NAME);
    }
}