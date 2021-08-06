import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import VcPrintParameterRequestBody from "./VcPrintParameterRequestBody";
import VcPrintParameterRequestHeader from "./VcPrintParameterRequestHeader";
import Request from '@api/Request';

export default class VcPrintParameterRequest {

    static sendPrintCocRequest = (object)=>{
        let requestBody = VcPrintParameterRequestBody.buildPrintCoc(object.documentLineId);
        let requestHeader = new VcPrintParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCPrintExcelManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendPrintPackingListRequest = (object)=>{
        let requestBody = VcPrintParameterRequestBody.buildPrintPackingList(object.documentLineId);
        let requestHeader = new VcPrintParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCPrintExcelManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendPrintShippingListRequest = (object)=>{
        let requestBody = VcPrintParameterRequestBody.buildPrintShippingList(object.documentLineId);
        let requestHeader = new VcPrintParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCPrintExcelManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendPrintPKListRequest = (object)=>{
        let requestBody = VcPrintParameterRequestBody.buildPrintPKList(object.documentLineId);
        let requestHeader = new VcPrintParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCPrintExcelManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendPrintPackingListAndCocRequest = (object)=>{
        let requestBody = VcPrintParameterRequestBody.buildPrintPackingListAndCoc(object.documentLineId);
        let requestHeader = new VcPrintParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCPrintExcelManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetBoxParaRequest = (object)=>{
        let requestBody = VcPrintParameterRequestBody.buildGetBoxParameter(object.materialLotId);
        let requestHeader = new VcPrintParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCGetPrintParameterUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetRYBoxParaRequest = (object)=>{
        let requestBody = VcPrintParameterRequestBody.buildGetRYBoxParameter(object.materialLotId);
        let requestHeader = new VcPrintParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCGetPrintParameterUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}
