import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "GCMaterialLotManage";

export default class MaterialLotManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
