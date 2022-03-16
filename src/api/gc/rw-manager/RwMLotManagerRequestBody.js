
const ActionType = {
    GetPrintParameter: "getPrintParameter",
    RWReceivePackedLot: "RWReceivePackedLot",
    GetLotPrintLabel: "GetLotPrintLabel",
    AutoPick: "AutoPick",
    StockOutTag: "StockOutTag",
    UnStockOutTag: "UnStockOutTag",
    AddShipOrderId: "AddShipOrderId",
    CancelShipOrderId: "CancelShipOrderId",
    PreView: "PreView",
    QueryMLot: "QueryMLot",
    ValidateMLot: "ValidateMLot",
    StockOut: "StockOut",
    RWBoxPrint: "RWBoxPrint",
    RWStockOutPrint: "RWStockOutPrint",
    RWBoxLabelPrint: "RWBoxLabelPrint",
    COBWaferQuery: "COBWaferQuery",
    WaferAutoPick: "WaferAutoPick",
    WaferStockOutTag: "WaferStockOutTag",
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

    static buildGetPrintParam(materialLotList, printCount) {
        let body = new RwMLotManagerRequestBody(ActionType.GetPrintParameter, materialLotList);
        body.printCount = printCount;
        return body;
    }

    /**
     * RW完成品接收
     * @param mesPackedLots 待接收的完成品
     * @param printLabel 仓库
     */
    static buildRwReceivePackedLot(mesPackedLots, printLabel, printCount) {
        let body = new RwMLotManagerRequestBody(ActionType.RWReceivePackedLot);
        body.mesPackedLots = mesPackedLots;
        body.printLabel = printLabel;
        body.printCount = printCount;
        return body;
    }

    /**
     * RW产线接收Lot标签补打
     * @param materialLot Lot信息
     */
    static buildGetRwLotPrintParam(materialLot, printCount) {
        let body = new RwMLotManagerRequestBody(ActionType.GetLotPrintLabel);
        body.materialLot = materialLot;
        body.printCount = printCount;
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

    /**
     * 自动挑选
     * @param materialLotUnitList 
     * @returns 
     */
    static buildAutoPickTagMLotUnit(materialLotUnitList, pickQty) {
        let body = new RwMLotManagerRequestBody(ActionType.WaferAutoPick);
        body.materialLotUnitList = materialLotUnitList;
        body.pickQty = pickQty;
        return body;
    }

     /**
     * 根据表单和查询条件获取
     * @param tableRrn 
     * @param whereClause 
     * @returns 
     */
    static buildQueryCobWaferMLotUnit(tableRrn, whereClause) {
        let body = new RwMLotManagerRequestBody(ActionType.COBWaferQuery);
        body.tableRrn = tableRrn;
        body.whereClause = whereClause;
        return body;
    }

        /**
     * 标注
     * @param materialLotList 
     * @param abbreviation 
     * @param customerName 
     * @param remarks 
     * @returns 
     */
    static buildCOBMLotUnitStockTagging(materialLotUnitList, abbreviation, customerName, remarks) {
        let body = new RwMLotManagerRequestBody(ActionType.WaferStockOutTag);
        body.materialLotUnitList = materialLotUnitList;
        body.abbreviation = abbreviation;
        body.customerName = customerName;
        body.remarks = remarks;
        return body;
    }
        
    /**
     * 标注
     * @param materialLotList 
     * @param abbreviation 
     * @param customerName 
     * @param remarks 
     * @returns 
     */
    static buildRwMLotStockTagging(materialLotList, abbreviation, customerName, remarks) {
        let body = new RwMLotManagerRequestBody(ActionType.StockOutTag, materialLotList);
        body.abbreviation = abbreviation;
        body.customerName = customerName;
        body.remarks = remarks;
        return body;
    }

    /**
     * 取消标注
     * @param materialLotList 
     * @returns 
     */
    static buildRwMLotUnStockTagging(materialLotList) {
        return new RwMLotManagerRequestBody(ActionType.UnStockOutTag, materialLotList);
    }

    /**
     * 添加出货单号
     * @param {*} materialLotList 
     * @param {*} shipOrderId 
     * @returns 
     */
    static buildMLotAddShipOrderId(materialLotList, shipOrderId) {
        let body = new RwMLotManagerRequestBody(ActionType.AddShipOrderId, materialLotList);
        body.shipOrderId = shipOrderId;
        return body;
    }

    static buildMLotCancelShipOrderId(materialLotList) {
        let body = new RwMLotManagerRequestBody(ActionType.CancelShipOrderId, materialLotList);
        return body;
    }

    static buildMLotPreViewMLot(materialLotList) {
        let body = new RwMLotManagerRequestBody(ActionType.PreView, materialLotList);
        return body;
    }

    static buildRwStockOutMLotByTableRrnAndLotId(tableRrn, queryLotId) {
        let body = new RwMLotManagerRequestBody(ActionType.QueryMLot);
        body.tableRrn = tableRrn;
        body.queryLotId = queryLotId;
        return body;
    }

    static buildRwStockOut(materialLotList, documentLineList) {
        let body = new RwMLotManagerRequestBody(ActionType.StockOut, materialLotList);
        body.documentLineList = documentLineList;
        return body;
    }


    static buildRWBoxPrintParameter(materialLotRrn, printCount) {
        let body = new RwMLotManagerRequestBody(ActionType.RWBoxPrint);
        body.materialLotRrn = materialLotRrn;
        body.printCount = printCount;
        return body;
    }

    static buildRWStockOutPrintParameter(materialLotRrn) {
        let body = new RwMLotManagerRequestBody(ActionType.RWStockOutPrint);
        body.materialLotRrn = materialLotRrn;
        return body;
    }

    static buildRWBoxLabelPrintParameter(materialLotRrn) {
        let body = new RwMLotManagerRequestBody(ActionType.RWBoxLabelPrint);
        body.materialLotRrn = materialLotRrn;
        return body;
    }
}


