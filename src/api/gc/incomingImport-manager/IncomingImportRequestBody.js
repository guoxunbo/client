import Table from "../../dto/ui/Table"

export default class IncomingImportRequestBody {

    importType;
    warehouseId;
    materialLotList;
    materialLotUnitList;

    constructor(importType, warehouseId, materialLotList, materialLotUnitList){
        this.importType = importType;
        this.warehouseId = warehouseId;
        this.materialLotList = materialLotList;
        this.materialLotUnitList = materialLotUnitList;
    }

    static buildSelectFile(importType) {
        return new IncomingImportRequestBody(importType);
    }

    static buildImportInfo(importType, warehouseId, materialLotList) {
        if(importType == "COB（-4成品）" || importType == "WLA未测（-2.5）"){
            let materialLotUnitList = materialLotList;
            materialLotUnitList.forEach(materialLotUnit => {
                materialLotUnit.reserved4 = materialLotUnit.reserved6;
                materialLotUnit.reserved6 = "";
                materialLotUnit.reserved13 = warehouseId;
                materialLotUnit.reserved47 = importType;
            });
            return new IncomingImportRequestBody(importType, warehouseId, undefined, materialLotUnitList);
        } else {
            return new IncomingImportRequestBody(importType, warehouseId, materialLotList);
        }
    }


}