import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "CsvImportManager";

export default class CsvImportRequestBodyHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}