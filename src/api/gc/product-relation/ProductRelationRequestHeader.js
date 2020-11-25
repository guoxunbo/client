import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "ProductRelationManage";

export default class ProductRelationRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
