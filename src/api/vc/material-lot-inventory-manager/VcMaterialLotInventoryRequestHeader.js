import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "VcInventoryManager";

export default class VcMaterialLotInventoryRequestHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    }
}