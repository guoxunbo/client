import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "MaterialLotIQC";

export default class MaterialLotIqcRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }

}