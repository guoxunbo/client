import MaterialLot from "../../dto/mms/MaterialLot";

const ActionType = {
    GetCheckList: "GetCheckList",
    Judge: "Judge",
}
export default class StockOutCheckRequestBody {

    actionType;
    checkList;

    constructor(actionType, materialLot, checkList){
        this.actionType = actionType;
        this.materialLot = materialLot;
        this.checkList = checkList;
    }

    static buildGetCheckData() {
        return new StockOutCheckRequestBody(ActionType.GetCheckList);
    }

    /**
     * 创建判定请求体
     *  只能支持判定一个箱或者一个批次。不能批量判定
     * @param {*} materialLots 
     * @param {*} checkList 
     */
    static buildJudge(materialLots, checkList) {
        let materialLot = new MaterialLot();
        if (materialLots[0].parentMaterialLotId) {
            materialLot.setMaterialLotId(materialLots[0].parentMaterialLotId);
        } else {
            materialLot.setMaterialLotId(materialLots[0].materialLotId);
        }
        return new StockOutCheckRequestBody(ActionType.Judge, materialLot, checkList);
    }

}   

