
const ActionType = {
    GetPrintParameter: "getPrintParameter",
    RWReceivePackedLot: "RWReceivePackedLot",
}

export default class RwMLotManagerRequestBody {

    actionType;
    materialLotList;

    constructor(actionType, materialLotList){
        this.actionType = actionType;
        this.materialLotList = materialLotList;
    }

    static buildGetPrintParam(materialLotList) {
        return new RwMLotManagerRequestBody(ActionType.GetPrintParameter, materialLotList);
    }

    /**
     * RW完成品接收
     * @param mesPackedLots 待接收的完成品
     * @param printLabel 仓库
     */
    static buildRwReceivePackedLot(mesPackedLots, printLabel) {
        let body = new RwMLotManagerRequestBody(ActionType.RWReceivePackedLot);
        body.mesPackedLots = mesPackedLots;
        body.printLabel = printLabel;
        return body;
    }
}


