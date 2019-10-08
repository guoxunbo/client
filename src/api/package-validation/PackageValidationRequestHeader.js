import RequestHeader from "../RequestHeader";
const MESSAGE_NAME = "ValidationPackMaterialLot";

export default class PackageValidationRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }

}