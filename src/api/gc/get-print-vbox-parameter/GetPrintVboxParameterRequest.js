import GetPrintVboxParameterRequestHeader from './GetPrintVboxParameterRequestHeader';
import GetPrintVboxParameterRequestBody from './GetPrintVboxParameterRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class GetPrintVboxParameterRequest {

    static sendQueryRequest = (object) => {
        let requestBody = GetPrintVboxParameterRequestBody.buildQuery(object.mesPackedLots);
        let requestHeader = new GetPrintVboxParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCGetPrintVboxParameterUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetDataByRrnRequest = (object) => {
        let requestBody = GetPrintVboxParameterRequestBody.buildQueryVboxInfo(object.tableRrn, object.vboxId);
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

