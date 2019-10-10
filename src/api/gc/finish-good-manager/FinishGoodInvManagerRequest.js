import FinishGoodManagerRequestHeader from './FinishGoodManagerRequestHeader';
import FinishGoodManagerRequestBody from './FinishGoodManagerRequestBody';
import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';

export default class FinishGoodInvManagerRequest {

    static sendReceiveRequest = (object) => {
        let requestBody = FinishGoodManagerRequestBody.buildReceive(object.mesPackedLots);
        let requestHeader = new FinishGoodManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.FinishGoodManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
}