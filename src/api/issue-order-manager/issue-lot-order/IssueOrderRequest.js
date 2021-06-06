import IssueOrderRequestHeader from './IssueOrderRequestHeader';
import IssueOrderRequestBody from './IssueOrderRequestBody';
import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';

export default class IssueOrderRequest {

    static sendGetIssueLotInfoRequest = (object) => {
        let requestBody =  IssueOrderRequestBody.buildGetIssueLotInfo(object.documentId);
        let requestHeader = new IssueOrderRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSIssueMLotByDocUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendIssueLotRequest = (object) => {
        let requestBody = IssueOrderRequestBody.buildIssueLot(object.documentId, object.materialLots);
        let requestHeader = new IssueOrderRequestHeader();
        let request = new Request(requestHeader,requestBody, UrlConstant.VCIssueMLotByDocUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
}