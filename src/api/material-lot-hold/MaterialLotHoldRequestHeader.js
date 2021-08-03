import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "HoldMaterialLot";

export default class MaterialLotHoldRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
