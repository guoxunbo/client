import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "QuestionLineManage";

export default class QuestionLineRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }

}