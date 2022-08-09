import GetPrintVboxParameterRequestHeader from './GetPrintVboxParameterRequestHeader';
import GetPrintVboxParameterRequestBody from './GetPrintVboxParameterRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class GetPrintVboxParameterRequest {

    static sendPrintLabelRequest = (object) => {
        let requestBody = GetPrintVboxParameterRequestBody.buildPrintLabel(object.materialLotList);
        let requestHeader = new GetPrintVboxParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCGetPrintVboxParameterUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

}

