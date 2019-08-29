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

    static buildJudge(packedLotDetails, checkList) {
        let materialLot = new MaterialLot();
        packedLotDetails.forEach(packedLotDetail => {
            materialLot.setMaterialLotId(packedLotDetail.packagedLotId);
        });
        return new StockOutCheckRequestBody(ActionType.Judge,materialLot, checkList);
    }

}   

