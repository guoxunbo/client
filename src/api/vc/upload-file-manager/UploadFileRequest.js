import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import UploadFileRequestBody from "./UploadFileRequestBody";
import UploadFileRequestBodyHeader from "./UploadFileRequestBodyHeader";
import Request from '@api/Request';

export default class UploadFileRequest {

    static sendUploadFileRequest = (object, file) => {
        let requestBody =  new UploadFileRequestBody.buildUploadFile(object.modelClass);
        let requestHeader = new UploadFileRequestBodyHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCUploadFileManager);
        let requestObject = {
            request: request,
            success: object.success,
        }
        MessageUtils.sendImportData(requestObject, file);
    }
}
