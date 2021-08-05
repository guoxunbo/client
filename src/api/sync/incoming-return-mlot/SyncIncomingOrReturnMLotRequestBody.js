
const SyncActionType = {
    //同步辅材
    SyncIncomingOrReturn: "SyncIncomingOrReturn",
    //同步主材
    SyncMainMLotIncomingOrReturn: "SyncMainMLotIncomingOrReturn"
}

export default class SyncIncomingOrReturnMLotRequestBody {

    actionType;

    constructor(actionType){
        this.actionType = actionType;
    }

  
    static buildSyncIncomingOrReturn(actionType) {
        return new SyncIncomingOrReturnMLotRequestBody(actionType);
    }
}
export {SyncActionType}