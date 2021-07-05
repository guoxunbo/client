import IssueOrderRequestHeader from './IssueOrderRequestHeader';
import IssueOrderRequestBody from './IssueOrderRequestBody';
import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';

/**
 * 指定批次
 */
export default class IssueOrderRequest {

    /**
     * 已指定物料批次
     * @param {*} object 
     */
     static sendGetWaitMLotByOrderRequest = (object) => {
        let requestBody =  IssueOrderRequestBody.buildGetWaitMLotByOrder(object.documentId);
        let requestHeader = new IssueOrderRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCIssueMLotByDocUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 发料 已指定物料批次
     * @param {*} object 
     */
    static sendIssueMLotByDocRequest = (object) => {
        let requestBody =  IssueOrderRequestBody.buildIssueMLotByDoc(object.documentId, object.materialLots);
        let requestHeader = new IssueOrderRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCIssueMLotByDocUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 已指定物料批次
     * 获得打印参数
     * @param {*} object 
     */
    static sendGetPrintIssueOrderRequest = (object) => {
        let requestBody =  IssueOrderRequestBody.buildGetPrintIssueOrder(object.documentId);
        let requestHeader = new IssueOrderRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCGetPrintParameterUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 内部发起
     * 创建发料单 指定物料批次以及数量 
     * @param {*} object 
     */
    static sendCreateIssueMLotOrderRequest= (object) => {
        let requestBody =  IssueOrderRequestBody.buildCreateIssueMLotOrder(object.materialLots);
        let requestHeader = new IssueOrderRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSCreateIssueOrderUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 内部发起
     * 发料 指定物料批次以及数量
     * @param {*} object 
     */
     static sendIssueMaterialLotByOrderRequest= (object) => {
        let requestBody =  IssueOrderRequestBody.buildIssueMaterialLotByOrder(object.documentId, object.materialLots);
        let requestHeader = new IssueOrderRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSIssueMLotByDocUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }
}
