
const ActionType = {
    Create: "Create",
    Update: "Update",
    Active: "Active",
    Delete: "Delete"
}

export default class EqpRecipeRequestBody {
    actionType;
    recipeEquipment;

    constructor(actionType, recipeEquipment) {
        this.actionType = actionType;
        this.recipeEquipment = recipeEquipment;
    }
    
    static buildMergeEntity(recipeEquipment) {
        let actionType;
        if (recipeEquipment.objectRrn) {
            actionType = ActionType.Update;         
        } else {
            actionType = ActionType.Create;         
        }
        return new EqpRecipeRequestBody(actionType, recipeEquipment);
    }

    static buildActiveEntity(recipeEquipment) {
        return new EqpRecipeRequestBody(ActionType.Active, recipeEquipment);
    }

    static buildDeleteEntity(recipeEquipment) {
        return new EqpRecipeRequestBody(ActionType.Delete, recipeEquipment);
    }
}