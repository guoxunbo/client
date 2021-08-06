
const ActionType = {
    ImportSave: "ImportSave",
}

export default class IncomingMaterialImportRequestBody {

    materialLotList;
    importTypeNbTable;
    actionType;

    constructor(materialLotList, importTypeNbTable, actionType){
        this.materialLotList = materialLotList;
        this.importTypeNbTable = importTypeNbTable;
        this.actionType = actionType;
    }

    static buildImportInfo(materialLotList) {
        return new IncomingMaterialImportRequestBody(materialLotList, undefined, ActionType.ImportSave);
    }

    static buildSelect(object) {
        return new IncomingMaterialImportRequestBody(undefined, object.importTypeNbTable);
    }
}