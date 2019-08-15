
const ActionType = {
    Close: "Close",
    Open: "Open",
    Create: "Create",
    Update: "Update",
    Watching: "Watching",
}

export default class QuestionRequestBody {
    actionType;
    question;
    tableRrn;

    constructor(actionType, question, tableRrn) {
        this.actionType = actionType;
        this.question = question;
        this.tableRrn = tableRrn;
    }
    
    static buildMergeEntity(question, tableRrn) {
        let actionType;
        if (question.objectRrn) {
            actionType = ActionType.Update;         
        } else {
            actionType = ActionType.Create;         
        }
        return new QuestionRequestBody(actionType, question, tableRrn);
    }

    static buildClose(question) {
        return new QuestionRequestBody(ActionType.Close, question);
    }


    static buildWatching(question) {
        return new QuestionRequestBody(ActionType.Watching, question);
    }

}