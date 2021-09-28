import {UrlConstant, DefaultRowKey} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';
import IssueOrderByMaterialRequestBody from './IssueOrderByMaterialRequestBody';
import IssueOrderByMaterialRequestHeader from './IssueOrderByMaterialRequestHeader';

/**
 * 指定物料
 */
export default class IssueOrderByMaterialRequest {

    /**
     * 创建指定物料发料单
     * @param {*} object 
     */
    static sendCreateIssueOrderByMaterialRequest = (object) => {
        let requestBody = IssueOrderByMaterialRequestBody.buildCreateIssueOrderByMaterial(object.materials, object.actionComment);
        let requestHeader = new IssueOrderByMaterialRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSCreateIssueOrderUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
     * 推荐指定物料发料单
     * @param {*} object 
     */
    static sendRecommendIssueMaterialRequest = (object) => {
        let requestBody = IssueOrderByMaterialRequestBody.buildRecommendIssueMaterial(object.documentId);
        let requestHeader = new IssueOrderByMaterialRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSIssueMaterialByOrderUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
     * 指定物料发料物料
     * @param {} object 
     */
    static sendIssueMaterialRequest = (object) => {
        let requestBody = IssueOrderByMaterialRequestBody.buildIssueMaterial(object.documentId, object.materialLots);
        let requestHeader = new IssueOrderByMaterialRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSIssueMaterialByOrderUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
     * 获得物料库存数量
     * @param {*} object 
     */
    static sendGetMaterialStockQtyRequest = (object) => {
        let requestBody = IssueOrderByMaterialRequestBody.buildGetMaterialStockQty(object.materials);
        let requestHeader = new IssueOrderByMaterialRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSIssueMaterialByOrderUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}