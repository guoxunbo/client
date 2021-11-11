import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "ImportExcel";

export default class VcImportExcelRequestHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    }
}