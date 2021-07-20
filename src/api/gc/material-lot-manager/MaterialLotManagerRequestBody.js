const ActionType = {
    BindRelayBox: "BindRelayBox",
    UnbindRelayBox: "UnbindRelayBox",
    JudgePackedLot: "JudgePackedLot",
    GetPackCaseCheckList: "GetPackCaseCheckList",
    GetWltPackCaseCheckList: "GetWltPackCaseCheckList",
    QueryMLot: "QueryMLot",
    CancelCheck: "CancelCheck",
    QueryMaterialLotIdOrLotId: "QueryMaterialLotIdOrLotId",
}


export default class MaterialLotManagerRequestBody {

    materialLots;
    relayBoxId;
    actionType;
    checkList;
    tableRrn;
    queryLotId;

    constructor(actionType, materialLots, relayBoxId, queryLotId){
        this.actionType = actionType;
        this.materialLots = materialLots;
        this.relayBoxId = relayBoxId;
        this.queryLotId = queryLotId;
    }
    setCheckList(checkList) {
        this.checkList = checkList;
    }

    setTabRrn(tableRrn) {
        this.tableRrn = tableRrn;
    }

    static buildQueryMaterialLotIdOrLotId(tableRrn, queryLotId) {
        let requestBody = new MaterialLotManagerRequestBody(ActionType.QueryMaterialLotIdOrLotId, undefined, undefined, queryLotId);
        requestBody.setTabRrn(tableRrn);
        return requestBody;
    }

    static buildCancelCheck(materialLotList, cancelReason) {
        let requestBody = new MaterialLotManagerRequestBody(ActionType.CancelCheck, materialLotList);
        requestBody.cancelReason = cancelReason; 
        return requestBody;
    }

    static buildGetJudgePackCaseItemList() {
        let materialLotManagerRequestBody = new MaterialLotManagerRequestBody(ActionType.GetPackCaseCheckList);
        return materialLotManagerRequestBody;
    }

    static buildGetWltJudgePackCaseItemList() {
        let materialLotManagerRequestBody = new MaterialLotManagerRequestBody(ActionType.GetWltPackCaseCheckList);
        return materialLotManagerRequestBody;
    }

    static buildJudgePackedMaterialLots(materialLots, checkList) {
        let materialLotManagerRequestBody = new MaterialLotManagerRequestBody(ActionType.JudgePackedLot, materialLots, undefined);
        materialLotManagerRequestBody.setCheckList(checkList);
        return materialLotManagerRequestBody;
    }

    static buildBindRelayBox(materialLots, relayBoxId) {
        return new MaterialLotManagerRequestBody(ActionType.BindRelayBox, materialLots, relayBoxId);
    }

    static buildUnbindRelayBox(materialLots) {
        return new MaterialLotManagerRequestBody(ActionType.UnbindRelayBox, materialLots);
    }

    static buildQueryMLot(tableRrn, queryLotId) {
        let materialLotManagerRequestBody = new MaterialLotManagerRequestBody(ActionType.QueryMLot, undefined, undefined, queryLotId);
        materialLotManagerRequestBody.setTabRrn(tableRrn);
        return materialLotManagerRequestBody;    
    }

}   
export {ActionType}
