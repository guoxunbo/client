import MaterialLotAction from "../../dto/mms/MaterialLotAction";

const ActionType = {
    GetMLot : "GetMLot",
    Reserved : "Reserved",
    UnReserved: "UnReserved"
}
export default class ReservedManagerRequestBody {

    actionType;
    docLineRrn;
    tableRrn;
    materialLotActions;

    constructor(actionType, docLineRrn, tableRrn, materialLotActions){
        this.actionType = actionType;
        this.docLineRrn = docLineRrn;
        this.tableRrn = tableRrn;
        this.materialLotActions = materialLotActions;
    }
    
    static buildGetMaterialLot(docLineRrn, tableRrn) {
        return new ReservedManagerRequestBody(ActionType.GetMLot, docLineRrn, tableRrn);
    }

    static buildReserved(docLineRrn, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new ReservedManagerRequestBody(ActionType.Reserved, docLineRrn, undefined, materialLotActions);
    }

    static buildUnReserved(materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new ReservedManagerRequestBody(ActionType.UnReserved, undefined, undefined, materialLotActions);
    }

}

export {ActionType};

