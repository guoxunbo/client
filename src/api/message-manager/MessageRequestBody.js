
const ActionType = {
    Create: "Create",
    Update: "Update",
    Delete: "Delete",
}

export default class MessageRequestBody {
    actionType;
    message;

    constructor(actionType, message) {
        this.actionType = actionType;
        this.message = message;
    }
    
    static buildMergeEntity(message) {
        let actionType;
        if (message.objectRrn) {
            actionType = ActionType.Update;         
        } else {
            actionType = ActionType.Create;         
        }
        return new MessageRequestBody(actionType, message);
    }

    static buildDelete(message) {
        return new MessageRequestBody(ActionType.Delete, message);
    }
    
}