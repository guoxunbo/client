import MaterialLot from "@api/dto/mms/MaterialLot";

const ActionType = {
    GetCheckList: "GetCheckList",
    Judge: "Judge",
}
export default class StockOutCheckRequestBody {

    actionType;
    checkList;

    constructor(actionType, materialLots, checkList){
        this.actionType = actionType;
        this.materialLots = materialLots;
        this.checkList = checkList;
    }

    static buildGetCheckData() {
        return new StockOutCheckRequestBody(ActionType.GetCheckList);
    }

    /**
     * 创建判定请求体 
     * @param {*} materialLots 
     * @param {*} checkList 
     */
    static buildJudge(materialLots, checkList) {
        return new StockOutCheckRequestBody(ActionType.Judge, materialLots, checkList);
    }

}   

