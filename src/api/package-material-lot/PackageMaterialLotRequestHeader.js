import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "PackMaterialLot";

export default class PackageMaterialLotRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }

}