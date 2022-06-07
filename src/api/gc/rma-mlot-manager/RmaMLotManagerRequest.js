import RmaMLotManagerRequestHeader from './RmaMLotManagerRequestHeader';
import RmaMLotManagerRequestBody from './RmaMLotManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class RmaMLotManagerRequest {

    static sendReceiveRequest = (object) => {
        let {materialLots, printLabel } = object;
        let requestBody = RmaMLotManagerRequestBody.buildReceive(materialLots, printLabel);
        let requestHeader = new RmaMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRmaMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendPrintLableRequest = (object) => {
        let {materialLots, printCount} = object;
        let requestBody = RmaMLotManagerRequestBody.buildGetPrintParam(materialLots, printCount);
        let requestHeader = new RmaMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRmaMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }


}

