import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "LabMaterialManage";

export default class LabMaterialManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
