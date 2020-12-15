const ActionType = {
    Creata: "Create",
    Update: "Update",
}

export default class UnConfirmWaferManagerRequestBody {

    actionType;
    unConfirmWaferSet;

    constructor(actionType, unConfirmWaferSet){
        this.actionType = actionType;
        this.unConfirmWaferSet = unConfirmWaferSet;
    }

    static buildMergeUnConfirmWaferSet(unConfirmWaferSet) {
        let actionType;
        if (unConfirmWaferSet.objectRrn) {
            actionType = ActionType.Update;
        } else {
            actionType = ActionType.Creata;
        }
        return new UnConfirmWaferManagerRequestBody(actionType, unConfirmWaferSet);
    }
}

