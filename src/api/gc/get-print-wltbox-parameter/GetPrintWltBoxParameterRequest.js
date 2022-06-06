import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';
import GetPrintWltBoxParameterRequestBody from './GetPrintWltBoxParameterRequestBody';
import GetPrintWltBoxParameterRequestHeader from './GetPrintWltBoxParameterRequestHeader';

export default class GetPrintWltBoxParameterRequest {

    static sendQueryRequest = (object) => {
        let requestBody = GetPrintWltBoxParameterRequestBody.buildQuery(object.materialLotUnitList);
        let requestHeader = new GetPrintWltBoxParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCGetPrintWltBoxParameterUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

    static printWaferLabel = (object) => {
        let requestBody = GetPrintWltBoxParameterRequestBody.buildWaferPrint(object.materialLotUnitList);
        let requestHeader = new GetPrintWltBoxParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCGetPrintWltBoxParameterUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

}

