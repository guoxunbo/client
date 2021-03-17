import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "SplitMaterialLot";

export default class MaterialLotSplitRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
