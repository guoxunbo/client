import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "ProductManage";

export default class ProductManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
