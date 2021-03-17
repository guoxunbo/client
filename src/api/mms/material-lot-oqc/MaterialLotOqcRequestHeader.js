import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "MaterialLotOQC";

export default class MaterialLotOqcRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }

}