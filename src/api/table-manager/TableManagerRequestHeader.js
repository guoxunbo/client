import RequestHeader from "../RequestHeader";
const MESSAGE_NAME = "TableManager";

export default class TableManagerRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }
    
}
