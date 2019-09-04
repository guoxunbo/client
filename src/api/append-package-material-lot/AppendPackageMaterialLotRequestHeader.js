
import RequestHeader from "../RequestHeader";
const MESSAGE_NAME = "AppendPackMaterialLot";

export default class AppendPackageMaterialLotRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }

}