import RequestHeader from "@api/RequestHeader";

const MESSAGE_NAME = "IncomingMaterialDelete";

export default class IncomingMaterialDeleteRequestHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    };

}