
const actionType = {
    SaveStorageInfo: 'saveStorageInfo',
    Import: 'import',
}
export default class StorageManagerRequestBody {

    actionType;
    storage;
    objectRrn;

    constructor(actionType, storage, objectRrn){
        this.actionType = actionType;
        this.storage = storage;
        this.objectRrn = objectRrn;
    }

    static buildSaveStorageInfo(storage) {
        return new StorageManagerRequestBody(actionType.SaveStorageInfo, storage);
    }

    static buildImport(objectRrn) {
        return new StorageManagerRequestBody(actionType.Import, undefined, objectRrn);
    }
    
}