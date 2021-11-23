import RetestManagerRequestHeader from './RetestManagerRequestHeader';
import RetestManagerRequestBody from './RetestManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class RetestManagerRequest {

    static sendRetestRequest = (object) => {
        let {documentLines, materialLots} = object;
        let requestBody = RetestManagerRequestBody.buildRetest(documentLines, materialLots);
        let requestHeader = new RetestManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCReTestUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendMobileRetestRequest = (object) => {
        let requestBody = RetestManagerRequestBody.buildMobileRetest(object.materialLots, object.erpTime);
        let requestHeader = new RetestManagerRequestHeader();
        let request = new Request(requestHeader,requestBody,UrlConstant.GCReTestUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}

