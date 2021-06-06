import IssueMaterialOrderRequestHeader from './IssueMaterialOrderRequestHeader';
import IssueMaterialOrderRequestBody from './IssueMaterialOrderRequestBody';
import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';

export default class IssueMaterialOrderRequest {

    static sendGetIssueMaterialInfoRequest = (object) => {
        let requestBody =  IssueMaterialOrderRequestBody.buildGetIssueMaterialInfo(object.documentLine);
        let requestHeader = new IssueMaterialOrderRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSIssueMLotByDocLineUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
    static sendIssueMaterialRequest = (object) =>{
        let requestBody = IssueMaterialOrderRequestBody.buildIssueMaterial(object.documentLine, object.materialLots);
        let requestHeader = new IssueMaterialOrderRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCIssueMLotByDocLineUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendValidationRequest = (object) =>{
        let requestBody = IssueMaterialOrderRequestBody.buildValidation(object.documentLine, object.materialLotId);
        let requestHeader = new IssueMaterialOrderRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCIssueMLotByDocLineUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}