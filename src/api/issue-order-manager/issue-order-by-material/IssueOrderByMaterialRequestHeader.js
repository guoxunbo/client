import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "LabMLotManage";

export default class IssueOrderByMaterialRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
