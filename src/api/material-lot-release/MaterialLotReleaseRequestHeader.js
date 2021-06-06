import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "ReleaseMaterialLot";

export default class MaterialLotReleaseRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
