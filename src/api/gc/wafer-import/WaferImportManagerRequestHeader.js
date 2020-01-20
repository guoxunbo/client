import RequestHeader from "../../RequestHeader";

const MESSAGE_NAME = "MaterialLotUnitManage";

export default class WaferImportManagerRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }
    
}