import RequestHeader from "../RequestHeader";
const MESSAGE_NAME = "MaterialLotStockIn";

export default class MaterialLotStockInRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
