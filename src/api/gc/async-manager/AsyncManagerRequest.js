import AsyncManagerRequestHeader from './AsyncManagerRequestHeader';
import AsyncManagerRequestBody from './AsyncManagerRequestBody';
import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';

export default class AsyncManagerRequest {

    static sendAsyncRequest = (object) => {
        let requestBody = AsyncManagerRequestBody.buildAsync(object.actionType);
        let requestHeader = new AsyncManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCAsyncUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}

