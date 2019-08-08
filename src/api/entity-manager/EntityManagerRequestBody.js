const ActionType = {
    Creata: "Create",
    Update: "Update",
    Delete: "Delete",
    GetByRrn: "GetByRrn",
    GetById: "GetById",
    Upload: "Upload",
    Download: "Download"
}

const DeleteRelationEntityFlag = {
    Y: "Y",
    N: "N"
}

export default class EntityManagerRequestBody {

    actionType;
    entityModel;
    entityString;
    deleteRelationEntityFlag;
    filePropertyName;

    constructor(actionType, entityModel, entity, deleteRelationEntityFlag, filePropertyName){
        this.actionType = actionType;
        this.entityModel = entityModel;
        this.entityString = JSON.stringify(entity);
        this.deleteRelationEntityFlag = deleteRelationEntityFlag;
        this.filePropertyName = filePropertyName;
    }

    static buildUploadEntityFile(entityModel, entity, filePropertyName) {
        return new EntityManagerRequestBody(ActionType.Upload, entityModel, entity, false, filePropertyName);
    }

    static buildDownloadEntityFile(entityModel, entity, filePropertyName) {
        return new EntityManagerRequestBody(ActionType.Download, entityModel, entity, false, filePropertyName);
    }

    static buildMergeEntity(entityModel, entity) {
        let actionType;
        if (entity.objectRrn) {
            actionType = ActionType.Update;         
        } else {
            actionType = ActionType.Creata;         
        }
        return new EntityManagerRequestBody(actionType, entityModel, entity);
    }

    static buildDeleteEntity(entityModel, entity, deleteRelationEntityFlag) {
        if (!deleteRelationEntityFlag) {
            deleteRelationEntityFlag = false;
        }
        return new EntityManagerRequestBody(ActionType.Delete, entityModel, entity, deleteRelationEntityFlag);
    }

}

