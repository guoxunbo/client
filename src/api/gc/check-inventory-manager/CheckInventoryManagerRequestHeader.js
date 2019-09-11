import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "GCCheckInventory";

export default class CheckInventoryManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
