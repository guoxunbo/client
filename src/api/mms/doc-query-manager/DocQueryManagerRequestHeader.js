import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "DocQueryManager";

export default class DocQueryManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
