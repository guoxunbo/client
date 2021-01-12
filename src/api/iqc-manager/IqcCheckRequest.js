import Request from '@api/Request';
import { UrlConstant } from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import IqcCheckRequestBody from './IqcCheckRequestBody';
import IqcCheckRequestHeader from './IqcCheckRequestHeader';

export default class IqcCheckRequest {

    static sendIqcCheckRequest = (object) => {
        let requestBody = IqcCheckRequestBody.buildIQC(object);
        let requestHeader = new IqcCheckRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.IqcCheckManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
    static sendGetMLotCheckSheetLine = (object) => {
        let requestBody = IqcCheckRequestBody.buildGetMLotCheckSheetLine(object);
        let requestHeader = new IqcCheckRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.IqcCheckManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}