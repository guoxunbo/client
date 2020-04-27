import Table from "../../dto/ui/Table"

export default class IncomingImportRequestBody {

    fileName;
    importType;
    warehouseId;
    materialLotList;
    materialLotUnitList;

    constructor(importType, warehouseId, materialLotList, materialLotUnitList, fileName){
        this.importType = importType;
        this.warehouseId = warehouseId;
        this.materialLotList = materialLotList;
        this.materialLotUnitList = materialLotUnitList;
        this.fileName = fileName;
    }

    static buildSelectFile(importType, fileName) {
        return new IncomingImportRequestBody(importType, undefined, undefined, undefined, fileName);
    }

    static buildImportInfo(importType, warehouseId, materialLotList) {
        if(importType != "三星packing list(-2CP未测)"){
            let materialLotUnitList = materialLotList;
            return new IncomingImportRequestBody(importType, warehouseId, undefined, materialLotUnitList);
        } else {
            return new IncomingImportRequestBody(importType, warehouseId, materialLotList);
        }
    }


}