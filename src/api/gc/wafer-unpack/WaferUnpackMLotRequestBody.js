const ActionType = {
    WaferUnpack: "WaferUnpack",
    GetPrintLabel: "GetPrintLabel",
} 

export default class WaferUnpackMLotRequestBody {

    actionType;
    materialLotUnits;

    constructor(actionType, materialLotUnits){
        this.actionType = actionType;
        this.materialLotUnits = materialLotUnits;
    }

    static buildWaferUnpack(materialLotUnits) {
        return new WaferUnpackMLotRequestBody(ActionType.WaferUnpack, materialLotUnits);
    }

    /**
     * 补打COB虚拟重测箱标签
     */
     static buildCobRetestLabelAndMakeUp(materialLot, printCount, printType) {
        let body = new WaferUnpackMLotRequestBody(ActionType.GetPrintLabel);
        body.materialLot = materialLot;
        body.printCount = printCount;
        body.printType = printType;
        return body;
    }

}