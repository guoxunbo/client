import Request from "@api/Request";
import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import RetryInterfaceRequestBody from "./RetryInterfaceRequestBody";
import RetryInterfaceRequestHeader from "./RetryInterfaceRequestHeader";


export default class RetryInterfaceRequest{

    static sendRetryRequest = (object) =>{
        let requestBody =  RetryInterfaceRequestBody.buildRetry(object.interfaceFailList);
        let requestHeader = new RetryInterfaceRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCRetryInterface);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}