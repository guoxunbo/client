const ActionType = {
    Create: "Create",
    Receive: "Receive",
}

export default class GCRawMaterialImportRequestBody {

    actionType;
    materialLotList;
    importType

    constructor(actionType, materialLotList, importType){
        this.actionType = actionType;
        this.materialLotList = materialLotList;
        this.importType = importType;
    }

    static buildSelectFile() {
        return new GCRawMaterialImportRequestBody();
    }

    static buildImportInfo(materialLotList, importType) {
        return new GCRawMaterialImportRequestBody(ActionType.Create, materialLotList, importType);
    }

    static buildReceiveRawMaterial(materialLotList) {
        return new GCRawMaterialImportRequestBody(ActionType.Receive, materialLotList);
    }

}