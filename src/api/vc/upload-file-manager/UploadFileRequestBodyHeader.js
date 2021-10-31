import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "UploadFileManager";

export default class UploadFileRequestBodyHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    }
}