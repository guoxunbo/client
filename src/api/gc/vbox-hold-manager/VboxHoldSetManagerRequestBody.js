const ActionType = {
    Create: "Create",
    Update: "Update"
};

export default class VboxHoldSetManagerRequestBody {

    actionType;
    workorderRelation;

    constructor(actionType, workorderRelation){
        this.actionType = actionType;
        this.workorderRelation = workorderRelation;
    }

    static buildMergeVboxHoldSet(workorderRelation) {
        let actionType = ActionType.Update;
        if(workorderRelation.objectRrn == undefined){
            actionType = ActionType.Create;
        }
        return new VboxHoldSetManagerRequestBody(actionType, workorderRelation);
    }

}

