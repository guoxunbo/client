import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "MaterialLotStockUp";

export default class DocStockUpManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
