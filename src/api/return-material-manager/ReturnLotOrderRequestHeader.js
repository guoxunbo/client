import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "ReturnManager";

export default class ReturnLotOrderRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }
    
}
