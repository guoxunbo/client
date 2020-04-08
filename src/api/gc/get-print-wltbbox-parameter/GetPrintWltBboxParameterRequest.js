import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';
import GetPrintWltBboxParameterRequestBody from './GetPrintWltBboxParameterRequestBody';
import GetPrintWltBboxParameterRequestHeader from './GetPrintWltBboxParameterRequestHeader';

export default class GetPrintWltBboxParameterRequest {

    static sendQueryRequest = (object) => {
        let requestBody = GetPrintWltBboxParameterRequestBody.buildQuery(object.materialLotRrn);
        let requestHeader = new GetPrintWltBboxParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCGetPrintWltBboxParameterUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

}

