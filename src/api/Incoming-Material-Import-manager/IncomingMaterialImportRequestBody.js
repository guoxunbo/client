
export default class IncomingMaterialImportRequestBody {

    materialLotList;
  
    constructor(materialLotList){
        this.materialLotList = materialLotList;
    }

    static buildImportInfo(materialLotList) {
        return new IncomingMaterialImportRequestBody(materialLotList);
    }
  
}

