import GetMLotCodePrintParameterRequestHeader from './GetMLotCodePrintParameterRequestHeader';
import GetMLotCodePrintParameterRequestBody from './GetMLotCodePrintParameterRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class GetMLotCodePrintParameterRequest {

    /**
     * 直接进行打印，不再返回参数
     * @param {*} object 
     */
    static sendGetPrintParameterRequest = (object) => {
        let requestBody = GetMLotCodePrintParameterRequestBody.buildGetPrintParameter(object.printType ,object.materialLot);
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

