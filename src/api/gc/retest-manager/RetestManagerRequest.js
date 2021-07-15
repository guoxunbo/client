import RetestManagerRequestHeader from './RetestManagerRequestHeader';
import RetestManagerRequestBody from './RetestManagerRequestBody';
import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';

export default class RetestManagerRequest {

    static sendRetestRequest = (object) => {
        let {documentLine, materialLots} = object;
        let requestBody = RetestManagerRequestBody.buildRetest(documentLine, materialLots);
        let requestHeader = new RetestManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCReTestUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

}

