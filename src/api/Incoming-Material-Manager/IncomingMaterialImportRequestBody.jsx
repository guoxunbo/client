
export default class IncomingMaterialImportRequestBody {

    materialLotList;
    importTypeNbTable
  
    constructor(materialLotList, importTypeNbTable){
        this.materialLotList = materialLotList;
        this.importTypeNbTable = importTypeNbTable;
    }

    static buildImportInfo(materialLotList) {
        return new IncomingMaterialImportRequestBody(materialLotList);
    }

    static buildSelect(object) {
        return new IncomingMaterialImportRequestBody(undefined, object.importTypeNbTable);
    }
  
}