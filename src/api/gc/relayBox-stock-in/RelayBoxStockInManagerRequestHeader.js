import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCRelayBoxStockIn";


export default class RelayBoxStockInManagerRequestHeader extends RequestHeader {

    constructor() {
        super(MESSAGE_NAME);
    }
    
}