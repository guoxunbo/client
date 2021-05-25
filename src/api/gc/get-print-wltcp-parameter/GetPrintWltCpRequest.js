import GetPrintWltCpRequestHeader from './GetPrintWltCpRequestHeader';
import GetPrintWltCpRequestBody from './GetPrintWltCpRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class GetPrintWltCpRequest {

    static sendQueryPrintParmeterRequest = (object) => {
        let requestBody = GetPrintWltCpRequestBody.buildQueryPrintParameter(object.materialLot, object.printCount);
        let requestHeader = new GetPrintWltCpRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCPrintWltCpLotUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

}