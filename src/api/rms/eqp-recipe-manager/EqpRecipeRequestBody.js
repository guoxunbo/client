
const ActionType = {
    Create: "Create",
    Update: "Update",
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
}