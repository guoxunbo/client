import Table from "../../dto/ui/Table";
import WaferImportModel from "../../dto/mms/WaferImportModel";


const ActionType = {
    Show: "Show",
    Create: "Create",
}

export default class WaferImportManagerRequestBody {
    
    table;
    actionType;

    constructor(actionType,table){
        this.table = table;
        this.actionType = actionType;
    }
    
    setWaferImportModels(materialLotUnits){
        this.materialLotUnits = materialLotUnits;
    }

    static buildShow(objectRrn) {
        let table = new Table();
        table.setObjectRrn(objectRrn);
        return new WaferImportManagerRequestBody(ActionType.Show,table);
    }

    static buildImportInfo(objectRrn,list) {
        let table = new Table();
        table.setObjectRrn(objectRrn);
        let materialLotUnits = [];
        list.forEach(wafer => {
            let  waferImportModel = new WaferImportModel(wafer.unitId,wafer.materialName,wafer.materialLotId,wafer.currentQty,wafer.reserved1,wafer.reserved2,
                wafer.reserved3,wafer.reserved4,wafer.reserved5, wafer.reserved6,wafer.reserved7,wafer.reserved8,wafer.reserved9,wafer.reserved10,
                wafer.reserved11,wafer.reserved12,wafer.reserved13,wafer.reserved14);
                materialLotUnits.push(waferImportModel);
            });
        let  requestBody = new WaferImportManagerRequestBody(ActionType.Create,table);
        requestBody.setWaferImportModels(materialLotUnits);
        return requestBody;
    }


}