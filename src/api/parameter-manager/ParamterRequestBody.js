
const ActionType = {
    Create: "Create",
    Update: "Update",
    Delete: "Delete",
}

export default class ParamterRequestBody {
    actionType;
    parameter;

    constructor(actionType, parameter) {
        this.actionType = actionType;
        this.parameter = parameter;
    }
    
    static buildMergeEntity(parameter) {
        let actionType;
        if (parameter.objectRrn) {
            actionType = ActionType.Update;         
        } else {
            actionType = ActionType.Create;         
        }
        return new ParamterRequestBody(actionType, parameter);
    }

    static buildDelete(parameter) {
        return new ParamterRequestBody(ActionType.Delete, parameter);
    }
    
}