import RequestHeader from "../RequestHeader";
const MESSAGE_NAME = "QuestionManage";

export default class QuestionRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }

}