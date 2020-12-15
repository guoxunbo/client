import FinishGoodManagerRequestHeader from './FinishGoodManagerRequestHeader';
import FinishGoodManagerRequestBody from './FinishGoodManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class FinishGoodInvManagerRequest {

    static sendReceiveRequest = (object) => {
        let requestBody = FinishGoodManagerRequestBody.buildCOMReceive(object.mesPackedLots);
        let requestHeader = new FinishGoodManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.FinishGoodManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendWLTReceiveRequest = (object) => {
        let requestBody = FinishGoodManagerRequestBody.buildWLTReceive(object.mesPackedLots, object.printLabel);
        let requestHeader = new FinishGoodManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.FinishGoodManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
    static sendCOBReceiveRequest = (object) => {
        let requestBody = FinishGoodManagerRequestBody.buildCOBReceive(object.mesPackedLots);
        let requestHeader = new FinishGoodManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.FinishGoodManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}