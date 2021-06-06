const ActionType={
    ImportSave:"importSave",
}
export default class CsvImportRequestBody {

    importTypeNbTable;
    dataList;
    actionType;
    materialLotList;
    
    constructor(importTypeNbTable, dataList, actionType){
        this.importTypeNbTable = importTypeNbTable;
        this.dataList = dataList;
        this.actionType = actionType;
    }

    setMaterialLotList(dataList){
        this.materialLotList = dataList;
    }

    static buildImport(importTypeNbTable) {
        return new CsvImportRequestBody(importTypeNbTable);
    }

    static buildSaveRawMaterial(dataList) {
        return new CsvImportRequestBody(undefined, dataList, ActionType.ImportSave);
    }

    static buildSaveProduct(dataList) {
        return new CsvImportRequestBody(undefined, dataList, ActionType.ImportSave);
    }

    static buildSaveLabMLot(dataList) {
        let csvImportRequestBody = new CsvImportRequestBody()
        csvImportRequestBody.setMaterialLotList(dataList);
        return csvImportRequestBody;
    }
}