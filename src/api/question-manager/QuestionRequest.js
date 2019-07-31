import QuestionRequestBody from "./QuestionRequestBody";
import QuestionRequestHeader from "./QuestionRequestHeader";
import { UrlConstant } from "../const/ConstDefine";
import Request from "../Request";
import MessageUtils from "../utils/MessageUtils";

export default class QuestionRequest {

    static sendMergeRequest = (object) => {
        if (object.values.newFlag) {
            object.values[DefaultRowKey] = undefined;
        }
        let requestBody = QuestionRequestBody.buildMergeEntity(object.values);
        let requestHeader = new QuestionRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.QuestionManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendCloseRquest = (object) => {
        let requestBody = QuestionRequestBody.buildClose(object.question);
        let requestHeader = new QuestionRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.QuestionManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}