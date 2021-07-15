import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import StorageManagerRequestBody from "./StorageManagerRequestBody";
import StorageManagerRequestHeader from "./StorageManagerRequestHeader";
import Request from '@api/Request';

export default class StorageManagerRequest {

    static sendSaveStorageInfo = (object)=>{
        let requestBody = StorageManagerRequestBody.buildSaveStorageInfo(object.storage);
        let requestHeader = new StorageManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCStorageManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendImportRequest = (object, file) => {
        let requestBody = StorageManagerRequestBody.buildImport(object.tableRrn);
        let requestHeader = new StorageManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCStorageImportUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendImportData} = MessageUtils();
        sendImportData(requestObject, file);
    }
}
