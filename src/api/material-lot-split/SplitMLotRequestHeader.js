import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "SplitMaterialLot";

export default class SplitMLotRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
