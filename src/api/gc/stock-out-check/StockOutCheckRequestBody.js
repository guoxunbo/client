import MaterialLot from "../../dto/mms/MaterialLot";

const ActionType = {
    GetCheckList: "GetCheckList",
    GetWltCheckList: "GetWltCheckList",
    Judge: "Judge",
    GetCheckMLot: "GetCheckMLot",
}
export default class StockOutCheckRequestBody {

    actionType;
    checkList;
    tableRrn;
    queryMLotId;

    constructor(actionType, materialLots, checkList){
        this.actionType = actionType;
        this.materialLots = materialLots;
        this.checkList = checkList;
    }

    setTableRrn(tableRrn){
        this.tableRrn=tableRrn;
    }

    setQueryMLotId(queryMLotId){
        this.queryMLotId=queryMLotId;
    }

    static buildGetCheckData() {
        return new StockOutCheckRequestBody(ActionType.GetCheckList);
    }

    static buildGetWltCheckData() {
        return new StockOutCheckRequestBody(ActionType.GetWltCheckList);
    }

    /**
     * 创建判定请求体 
     * @param {*} materialLots 
     * @param {*} checkList 
     */
    static buildJudge(materialLots, checkList) {
        return new StockOutCheckRequestBody(ActionType.Judge, materialLots, checkList);
    }

    static buildGetWaitCheckMLot(tableRrn, queryMLotId) {
        let requestBody = new StockOutCheckRequestBody(ActionType.GetCheckMLot);
        requestBody.setTableRrn(tableRrn);
        requestBody.setQueryMLotId(queryMLotId);
        return requestBody;
    }

}   

