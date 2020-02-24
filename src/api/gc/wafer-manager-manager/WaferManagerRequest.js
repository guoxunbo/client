import WaferManagerRequestHeader from './WaferManagerRequestHeader';
import WaferManagerRequestBody from './WaferManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class WaferManagerRequest {

    static sendReceiveWaferRequest = (object) => {
        let {documentLines, materialLots} = object;
        let requestBody = WaferManagerRequestBody.buildRetest(documentLines, materialLots);
        let requestHeader = new WaferManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCReceiveWaferUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}

