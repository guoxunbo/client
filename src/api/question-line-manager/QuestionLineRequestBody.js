
const ActionType = {
    Create: "Create",
    Update: "Update",
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
    
    static buildMergeEntity(questionLine) {
        let actionType;
        if (questionLine.objectRrn) {
            actionType = ActionType.Update;         
        } else {
            actionType = ActionType.Create;         
        }
        return new QuestionLineRequestBody(actionType, undefined, questionLine);
    }

    static GetByQuestionRrn(questionRrn) {
        return new QuestionLineRequestBody(ActionType.GetByQuestionRrn, questionRrn);
    }

}