const ActionType = {
    Creata: "Create",
    Update: "Update",
    CreataParts: "CreataParts",
    UpdateParts: "UpdateParts",
}

export default class RawMaterialManagerRequestBody {

    actionType;
    material;
    parts;

    constructor(actionType, material, parts){
        this.actionType = actionType;
        this.material = material;
        this.parts = parts;
    }

    static buildMergeRawMaterial(rawMaterial) {
        let actionType;
        if (rawMaterial.objectRrn) {
            actionType = ActionType.Update;
        } else {
            actionType = ActionType.Creata;
        }
        return new RawMaterialManagerRequestBody(actionType, rawMaterial);
    }

    static buildMergePartsMaterial(parts){
        let actionType;
        if (parts.objectRrn) {
            actionType = ActionType.UpdateParts;
        } else {
            actionType = ActionType.CreataParts;
        }
        return new RawMaterialManagerRequestBody(actionType, undefined, parts);
    }

}

