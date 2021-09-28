
const ActionType = {
    RetryInterface:"retryInterface",
}
export default class RetryInterfaceRequestBody {

    actionType;
    interfaceFailList;
    
    constructor(actionType, interfaceFailList){
        this.actionType = actionType;
        this.interfaceFailList = interfaceFailList;
    }

    static buildRetry(interfaceFailList){
        return new RetryInterfaceRequestBody(ActionType.RetryInterface, interfaceFailList);
    }
    
}