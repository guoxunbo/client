import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "IssueMLotByDoc";

export default class IssueOrderRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}