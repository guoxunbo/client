const ActionType={
    PrintCOBLabel: "PrintCOBLabel",
    PrintQRCodeLabel: "PrintQRCodeLabel",
}

export default class GetPrintBoxQRCodeParameterRequestBody {

    actionType;
    materialLot;
    printVboxLabelFlag;

    constructor(actionType, materialLot, printVboxLabelFlag){
        this.actionType = actionType;
        this.materialLot = materialLot;
        this.printVboxLabelFlag = printVboxLabelFlag;
    }

    static buildGetBoxPrintLabelParamater(materialLot) {
        return new GetPrintBoxQRCodeParameterRequestBody(ActionType.PrintCOBLabel, materialLot);
    }

    static buildGetBoxPrintQRCodeLabelParamater(materialLot, printVboxLabelFlag) {
        return new GetPrintBoxQRCodeParameterRequestBody(ActionType.PrintQRCodeLabel, materialLot, printVboxLabelFlag);
    }

}


