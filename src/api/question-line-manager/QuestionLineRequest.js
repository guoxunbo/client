import QuestionLineRequestBody from "./QuestionLineRequestBody";
import QuestionLineRequestHeader from "./QuestionLineRequestHeader";
import { UrlConstant } from "@const/ConstDefine";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";

export default class QuestionLineRequest {

    static sendGetByQuestionRrn = (object) => {
        let requestBody = QuestionLineRequestBody.GetByQuestionRrn(object.questionRrn);
        let requestHeader = new QuestionLineRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.QuestionLineManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    
}