import WaferManagerRequestHeader from './WaferManagerRequestHeader';
import WaferManagerRequestBody from './WaferManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class WaferManagerRequest {

    static sendReceiveWaferRequest = (object) => {
        let {documentLines, materialLots, receiveWithDoc} = object;
        let requestBody = WaferManagerRequestBody.buildReceive(documentLines, materialLots, receiveWithDoc);
        let requestHeader = new WaferManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWaferManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendValidationWaferIssueRequest = (object) => {
        let {documentLines, materialLots} = object;
        let requestBody = WaferManagerRequestBody.buildValidationWaferIssue(documentLines, materialLots);
        let requestHeader = new WaferManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWaferManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendWaferIssueRequest = (object) => {
        let {documentLines, materialLots, issueWithDoc, unPlanLot} = object;
        let requestBody = WaferManagerRequestBody.buildIssue(documentLines, materialLots, issueWithDoc, unPlanLot);
        let requestHeader = new WaferManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWaferManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendValidationWaitIssueWaferRequest = (object) => {
        let {materialLots} = object;
        let requestBody = WaferManagerRequestBody.buildValidationWaitIssueWafer(materialLots);
        let requestHeader = new WaferManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWaferManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    //采购委外接收
    static sendPurchaseOutsoureReceiveWaferRequest = (object) => {
        let {materialLots} = object;
        let requestBody = WaferManagerRequestBody.buildPurchaseOutsoureReceiveWafer(materialLots);
        let requestHeader = new WaferManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWaferManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetMaterialLotByRrnRequest = (object) => {
        let requestBody = WaferManagerRequestBody.buildGetMaterialLot(object.tableRrn,object.whereClause);
        let requestHeader = new WaferManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWaferManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendHKReceiveMLotRequest = (object) => {
        let requestBody = WaferManagerRequestBody.buildHKReceiveMaterialLot(object.materialLots);
        let requestHeader = new WaferManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWaferManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendCogReceiveMLotRequest = (object) => {
        let {documentLines, materialLots} = object;
        let requestBody = WaferManagerRequestBody.buildCogMLotReceive(documentLines, materialLots);
        let requestHeader = new WaferManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWaferManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendWaferOutOrderIssueRequest = (object) => {
        let {materialLots} = object;
        let requestBody = WaferManagerRequestBody.buildOutOrderIssue(materialLots);
        let requestHeader = new WaferManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWaferManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}

