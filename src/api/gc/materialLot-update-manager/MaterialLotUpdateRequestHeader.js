import RequestHeader from "../../RequestHeader";

const MESSAGE_NAME = "GCMaterialLotUpdate";

export default class MaterialLotUpdateRequestHeader extends RequestHeader {

    constructor() {
        super(MESSAGE_NAME);
    }

}