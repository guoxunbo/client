import RequestHeader from "../../RequestHeader";

const MESSAGE_NAME = "ValidationMatrial";

export default class ValidationMaterialRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }
    
}