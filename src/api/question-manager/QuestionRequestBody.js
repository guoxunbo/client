
const ActionType = {
    Close: "Close",
    Open: "Open",
    Create: "Create",
    Update: "Update",
    Watching: "Watching",
    Delete: "Delete"
}

export default class QuestionRequestBody {
    actionType;
    question;

    constructor(actionType, question) {
        this.actionType = actionType;
        this.question = question;
    }
    
    static buildMergeEntity(question) {
        let actionType;
        if (question.objectRrn) {
            actionType = ActionType.Update;         
        } else {
            actionType = ActionType.Create;         
        }
        return new QuestionRequestBody(actionType, question);
    }

    static buildClose(question) {
        return new QuestionRequestBody(ActionType.Close, question);
    }
    
    static buildDelete(question) {
        return new QuestionRequestBody(ActionType.Delete, question);
    }

    static buildWatching(question) {
        return new QuestionRequestBody(ActionType.Watching, question);
    }

}