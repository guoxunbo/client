
const ActionType = {
    GetByQuestionRrn: "GetByQuestionRrn",
    Upload: "Upload",
    Download: "Download"
}

export default class QuestionLineRequestBody {
    actionType;
    questionRrn;
    questionLine;

    constructor(actionType, questionRrn, questionLine) {
        this.actionType = actionType;
        this.questionRrn = questionRrn;
        this.questionLine = questionLine;
    }
    
    static GetByQuestionRrn(questionRrn) {
        return new QuestionLineRequestBody(ActionType.GetByQuestionRrn, questionRrn);
    }

}