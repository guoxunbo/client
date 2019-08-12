import RequestHeader from "../RequestHeader";
const MESSAGE_NAME = "TableManage";

export default class TableManagerRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }
    
}
