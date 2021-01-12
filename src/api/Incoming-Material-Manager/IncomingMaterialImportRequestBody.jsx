
export default class IncomingMaterialImportRequestBody {

    materialLotList;
    importTypeNbTable;
    actionType;
  
    constructor(materialLotList, importTypeNbTable, actionType){
        this.materialLotList = materialLotList;
        this.importTypeNbTable = importTypeNbTable;
        this.actionType = actionType;
    }

    static buildSelect(object) {
        return new IncomingMaterialImportRequestBody(undefined, object.importTypeNbTable);
    }

    static buildImportInfo(materialLotList, actionType) {
        return new IncomingMaterialImportRequestBody(materialLotList, undefined, actionType);
    }

}