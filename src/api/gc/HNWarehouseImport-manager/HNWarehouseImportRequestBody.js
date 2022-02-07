const MlotType = ["HNWarehouseImport"];
     
export default class HNWarehouseImportRequestBody {

    importType;
    materialLotList;
    materialLotUnitList;
    actionType;

    constructor(importType, materialLotList, materialLotUnitList){
        this.importType = importType;
        this.materialLotList = materialLotList;
        this.materialLotUnitList = materialLotUnitList;
    }

    static buildHNWarehouseImportInfo(importType, materialLotList) {
        if(MlotType.includes(importType)){
            return new HNWarehouseImportRequestBody(importType, materialLotList);
        } else {
            let materialLotUnitList = materialLotList;
            materialLotUnitList.forEach(materialLotUnit =>{
                materialLotUnit.reserved4 = materialLotUnit.reserved6;
            });
            return new HNWarehouseImportRequestBody(importType, undefined, materialLotUnitList);
        }
    }

}