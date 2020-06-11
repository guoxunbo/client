import GetMLotCodePrintParameterRequestHeader from './GetMLotCodePrintParameterRequestHeader';
import GetMLotCodePrintParameterRequestBody from './GetMLotCodePrintParameterRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class GetMLotCodePrintParameterRequest {

    static sendGetPrintParameterRequest = (object) => {
        let requestBody = GetMLotCodePrintParameterRequestBody.buildGetPrintParameter(object.printType ,object.materialLotList);
        let requestHeader = new GetMLotCodePrintParameterRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCGetMLotCodePrintParameterUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

}

