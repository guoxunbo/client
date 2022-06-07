import MaterialLotAction from "../../dto/mms/MaterialLotAction";

const ActionType = {
    Receive: "Receive",
    Print: "Print",
}

export default class RmaMLotManagerRequestBody {

    actionType;
    materialLots;
    materialLotActions;
    printLabel;
    printCount;

    constructor(actionType, materialLots, printCount){
        this.actionType = actionType;
        this.materialLots = materialLots;
        this.printCount = printCount;
    }
    
    setMaterialLotActions(materialLotActions) {
        this.materialLotActions = materialLotActions;
    }

    setPrintLabelFlag(printLabel){
        this.printLabel = printLabel;
    }

    static buildReceive(materialLots, printLabel) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction);
        });
        let requestBody = new RmaMLotManagerRequestBody(ActionType.Receive);
        requestBody.setMaterialLotActions(materialLotActions);
        requestBody.setPrintLabelFlag(printLabel);
        return requestBody;
    }

    static buildGetPrintParam(materialLots, printCount) {
        return new RmaMLotManagerRequestBody(ActionType.Print, materialLots, printCount);
    }

}


