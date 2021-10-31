
const ActionType = {
    UploadFile: "uploadFile"
}
export default class UploadFileRequestBody {

    actionType;
    modelClass;
    
    constructor(actionType, modelClass){
        this.actionType = actionType;
        this.modelClass = modelClass;
    }

    static buildUploadFile(modelClass) {
        return new UploadFileRequestBody(ActionType.UploadFile, modelClass);
    }
    
}