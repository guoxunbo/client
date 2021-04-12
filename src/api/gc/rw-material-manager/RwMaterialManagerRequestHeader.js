import RequestHeader from "../../RequestHeader";

const MESSAGE_NAME = "GCRwMaterialManager";

export default class RwMaterialManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
