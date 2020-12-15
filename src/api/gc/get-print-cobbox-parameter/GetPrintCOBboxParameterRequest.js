import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';
import GetPrintCOBboxParameterRequestBody from './GetPrintCOBboxParameterRequestBody';
import GetPrintCOBboxParameterRequestHeader from './GetPrintCOBboxParameterRequestHeader';

export default class GetPrintCOBboxParameterRequest {

    static sendQueryRequest = (object) => {
        let requestBody = GetPrintCOBboxParameterRequestBody.buildQuery(object.materialLot);
        let requestHeader = new GetPrintCOBboxParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCGetPrintCOBboxParameterUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

}

