import EqpRecipeRequestBody from "./EqpRecipeRequestBody";
import EqpRecipeRequestHeader from "./EqpRecipeRequestHeader";
import { UrlConstant } from "@const/ConstDefine";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";

export default class EqpRecipeRequest {

    static sendMergeRequest = (object) => {
        if (object.values.newFlag) {
            object.values[DefaultRowKey] = undefined;
        }
        let requestBody = EqpRecipeRequestBody.buildMergeEntity(object.values);
        let requestHeader = new EqpRecipeRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.EqpRecipeManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendActiveRequest = (object) => {
        let requestBody = EqpRecipeRequestBody.buildActiveEntity(object.values);
        let requestHeader = new EqpRecipeRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.EqpRecipeManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendDeleteRequest = (object) => {
        let requestBody = EqpRecipeRequestBody.buildDeleteEntity(object.values);
        let requestHeader = new EqpRecipeRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.EqpRecipeManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}