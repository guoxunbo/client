import GetPrintRawMlotRequestHeader from './GetPrintRawMlotRequestHeader';
import GetPrintRawMlotRequestBody from './GetPrintRawMlotRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class GetPrintRawMlotRequest {

    static sendPrintLableRequest = (object) => {
        let {materialLots} = object;
        let requestBody = GetPrintRawMlotRequestBody.buildGetPrintParam(materialLots);
        let requestHeader = new GetPrintRawMlotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRawMlotPrintManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendIRABoxPrintLableRequest = (object) => {
        let {materialLots} = object;
        let requestBody = GetPrintRawMlotRequestBody.buildGetIRABoxPrintParam(materialLots);
        let requestHeader = new GetPrintRawMlotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRawMlotPrintManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}

