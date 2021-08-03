const ActionType = {
    Merge: "merge",
    Import: "import"
}

export default class LabMaterialManagerRequestBody {

    actionType;
    material;
    importNBTableObjectRrn;

    constructor(actionType, material, importNBTableObjectRrn){
        this.actionType = actionType;
        this.material = material;
        this.importNBTableObjectRrn = importNBTableObjectRrn;
    }

    /**
     * 修改和添加 Merge
     * @param {*} LabMaterial 
     * @returns 
     */
    static buildMergeLawMaterial(LawMaterial) {
        return new LabMaterialManagerRequestBody(ActionType.Merge, LawMaterial);
    }

    static buildImportLawMaterial(objectRrn) {
        return new LabMaterialManagerRequestBody(ActionType.Import, undefined, objectRrn);
    }
}

