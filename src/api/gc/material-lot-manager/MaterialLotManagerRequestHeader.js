import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCMaterialLotManage";

export default class MaterialLotManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
