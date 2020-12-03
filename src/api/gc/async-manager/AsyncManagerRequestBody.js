
const ActionType = {
    AsyncReTestIssueOrder : "AsyncReTestIssueOrder",
    AsyncWaferIssueOrder : "AsyncWaferIssueOrder",
    AsyncReceiveOrder : "AsyncReceiveOrder",
    AsyncShipOrder : "AsyncShipOrder",
    AsyncMesProduct: "AsyncProduct",
    AsyncMesWaferType: "AsyncWaferType",
    AsyncSobOrder: "AsyncSobOrder",
    AsyncSoaOrder: "AsyncSoaOrder",
    AsyncCogReceiveOrder : "AsyncCogReceiveOrder",
}

export default class AsyncManagerRequestBody {

    actionType;

    constructor(actionType){
        this.actionType = actionType;
    }
    
    static buildAsync(actionType) {
        return new AsyncManagerRequestBody(actionType);
    }

}

export {ActionType};

