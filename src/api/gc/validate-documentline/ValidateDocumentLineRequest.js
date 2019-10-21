import ValidateDocumentLineRequestBody from "./ValidateDocumentLineRequestBody";
import ValidateDocumentLineRequestHeader from "./ValidateDocumentLineRequestHeader";
import Request from "../../Request";
import { UrlConstant } from "../../const/ConstDefine";
import MessageUtils from "../../utils/MessageUtils";

export default class ValidateDocumentLineRequest {

    static sendValidationRequest = (object) => {
        let {documentLines, materialLot} = object;
        let requestBody = ValidateDocumentLineRequestBody.buildValidation(documentLines, materialLot);
        let requestHeader = new ValidateDocumentLineRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCValidationDocumentLineUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

}