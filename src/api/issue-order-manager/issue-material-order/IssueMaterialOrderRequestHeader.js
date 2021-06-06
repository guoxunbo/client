import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "IssueMLotByDocLine";

export default class IssueMaterialOrderRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}