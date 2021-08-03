import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "StorageManager";

export default class StorageManagerRequestHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    }
}