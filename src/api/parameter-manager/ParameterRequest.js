import ParamterRequestBody from "./ParamterRequestBody";
import ParameterRequestHeader from "./ParameterRequestHeader";
import { UrlConstant } from "@const/ConstDefine";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";

export default class ParameterRequest {

    static sendMergeRequest = (object) => {
        if (object.values.newFlag) {
            object.values[DefaultRowKey] = undefined;
        }
        let requestBody = ParamterRequestBody.buildMergeEntity(object.values);
        let requestHeader = new ParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.ParameterManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendDeleteRequest = (object) => {
        let requestBody = ParamterRequestBody.buildDelete(object.values);
        let requestHeader = new ParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.ParameterManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}