import RequestHeader from "../RequestHeader";
const MESSAGE_NAME = "UnPackMaterialLot";

export default class UnPackageMaterialLotRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }

}