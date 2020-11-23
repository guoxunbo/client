import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "HKWarehouseManager";

export default class HKWarehouseManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
