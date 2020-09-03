const ActionType = {
    CreataParts: "CreateParts",
    UpdateParts: "UpdateParts",
}

export default class PartsMaterialManagerRequestBody {

    actionType;
    parts;

    constructor(actionType, parts){
        this.actionType = actionType;
        this.parts = parts;
    }

    static buildMergePartsMaterial(parts){
        let actionType;
        if (parts.objectRrn) {
            actionType = ActionType.UpdateParts;
        } else {
            actionType = ActionType.CreataParts;
        }
        return new PartsMaterialManagerRequestBody(actionType, parts);
    }

}

