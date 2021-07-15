import MessageRequestBody from "./MessageRequestBody";
import MessageRequestHeader from "./MessageRequestHeader";
import { UrlConstant } from "@const/ConstDefine";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";

export default class MessageRequest {

    static sendMergeRequest = (object) => {
        if (object.values.newFlag) {
            object.values[DefaultRowKey] = undefined;
        }
        let requestBody = MessageRequestBody.buildMergeEntity(object.values);
        let requestHeader = new MessageRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MessageManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendDeleteRequest = (object) => {
        let requestBody = MessageRequestBody.buildDelete(object.values);
        let requestHeader = new MessageRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MessageManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

}
