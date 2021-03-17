import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "ReturnMLotByDoc";

export default class ReturnLotOrderRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}