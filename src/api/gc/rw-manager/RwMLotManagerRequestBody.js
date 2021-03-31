
const ActionType = {
    GetPrintParameter: "getPrintParameter",
    RWReceivePackedLot: "RWReceivePackedLot",
    GetLotPrintLabel: "GetLotPrintLabel",
    AutoPick: "AutoPick",
    StockOutTag: "StockOutTag",
}

export default class RwMLotManagerRequestBody {

    actionType;
    materialLotList;
    pickQty;

    constructor(actionType, materialLotList, pickQty){
        this.actionType = actionType;
        this.materialLotList = materialLotList;
        this.pickQty = pickQty;
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

    /**
     * RW产线接收Lot标签补打
     * @param materialLot Lot信息
     */
    static buildGetRwLotPrintParam(materialLot) {
        let body = new RwMLotManagerRequestBody(ActionType.GetLotPrintLabel);
        body.materialLot = materialLot;
        return body;
    }

    /**
     * 自动挑选
     * @param materialLotList 
     * @returns 
     */
    static buildAutoPickTagMLot(materialLotList, pickQty) {
        return new RwMLotManagerRequestBody(ActionType.AutoPick, materialLotList, pickQty);
    }

    static buildRwMLotStockTagging(materialLotList, abbreviation, customerName, remarks) {
        let body = new RwMLotManagerRequestBody(ActionType.StockOutTag, materialLotList);
        body.abbreviation = abbreviation;
        body.customerName = customerName;
        body.remarks = remarks;
        return body;
    }
}


