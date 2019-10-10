import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "UnPackMaterialLot";

export default class UnPackageMaterialLotRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }

}