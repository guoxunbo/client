import GetPrintBboxParameterRequestHeader from './GetPrintBboxParameterRequestHeader';
import GetPrintBboxParameterRequestBody from './GetPrintBboxParameterRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class GetPrintBboxParameterRequest {

    static sendQueryRequest = (object) => {
        let requestBody = GetPrintBboxParameterRequestBody.buildQuery(object.materialLotRrn);
        let requestHeader = new GetPrintBboxParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCGetPringBboxParameterUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

}

