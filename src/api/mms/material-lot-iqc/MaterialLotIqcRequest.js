import MaterialLotIqcRequestBody from "./MaterialLotIqcRequestBody";
import MaterialLotIqcRequestHeader from "./MaterialLotIqcRequestHeader";
import { UrlConstant } from "@const/ConstDefine";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";

export default class MaterialLotIqcRequest {

    static sendIqcRequest = (object) => {
        let requestBody = MaterialLotIqcRequestBody.buildIqc(object.materialCheckSheet);
        let requestHeader = new MaterialLotIqcRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MateiralLotIqcUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendValidationAndGetWaitIQCMLotRequest = (object) => {
        let requestBody = MaterialLotIqcRequestBody.buildValidationAndGetWaitIqcMLot(object.materialLots);
        let requestHeader = new MaterialLotIqcRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMateiralLotIqcUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendBatchIqcRequest = (object) => {
        let requestBody = MaterialLotIqcRequestBody.buildBatchIqc(object.judgeMLotAndAction);
        let requestHeader = new MaterialLotIqcRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMateiralLotIqcUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendIqcApprovalRequest = (object) => {
        let requestBody = MaterialLotIqcRequestBody.buildIqcApproval(object.actionObject, object.formObjectList);
        let requestHeader = new MaterialLotIqcRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMateiralLotIqcUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}