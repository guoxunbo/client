import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import CheckMLotRequestBody from "./CheckMLotRequestBody";
import CheckMLotRequestHeader from "./CheckMLotRequestHeader";
import Request from '@api/Request';

export default class CheckMLotRequest {

    static sendCheckMLotRequest = (object)=>{
        let requestBody = CheckMLotRequestBody.buildCheckMLot(object.materialLots);
        let requestHeader = new CheckMLotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCCheckMLotManager);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
     * 根据单据信息盘点
     * @param {*} object 
     */
    static sendCheckMLotByOrderRequest = (object)=>{
        let requestBody = CheckMLotRequestBody.buildCheckMLotByOrder(object.documentLine, object.materialLots);
        let requestHeader = new CheckMLotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCCheckMLotManager);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
    * 根据单据信息复盘
    * @param {*} object 
    */
    static sendRecheckMLotByOrderRequest = (object)=>{
        let requestBody = CheckMLotRequestBody.buildRecheckMLotByOrder(object.documentLine, object.materialLots);
        let requestHeader = new CheckMLotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCCheckMLotManager);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
     * 获取符合规则的盘点物料批次信息
     * @param {*} object 
     */
    static sendGetReservedRequest = (object)=>{
        let requestBody = CheckMLotRequestBody.buildGetReservedMLot(object.documentLine);
        let requestHeader = new CheckMLotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCCheckMLotManager);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetWaitRecheckMLotRequest = (object)=>{
        let requestBody = CheckMLotRequestBody.buildGetWaitRecheckMLot(object.documentLine);
        let requestHeader = new CheckMLotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCCheckMLotManager);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }
}
