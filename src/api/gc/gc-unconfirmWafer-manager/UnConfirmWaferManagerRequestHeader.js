import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "UnConfirmWaferManager";

export default class UnConfirmWaferManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
