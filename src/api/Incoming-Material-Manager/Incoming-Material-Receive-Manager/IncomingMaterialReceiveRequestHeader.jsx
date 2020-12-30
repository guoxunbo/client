import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "ReceiveMaterialLotByDoc";

export default class IncomingMaterialReceiveRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}