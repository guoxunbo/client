
export default class GCRawMaterialImportRequestBody {

    materialLotList;
    importType

    constructor(materialLotList, importType){
        this.materialLotList = materialLotList;
        this.importType = importType;
    }

    static buildSelectFile() {
        return new GCRawMaterialImportRequestBody();
    }

    static buildImportInfo(materialLotList, importType) {
        return new GCRawMaterialImportRequestBody(materialLotList, importType);
    }


}