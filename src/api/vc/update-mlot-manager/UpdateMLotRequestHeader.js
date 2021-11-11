import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "MaterialLotUpdateMLot";

export default class UpdateMLotRequestHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    }
}