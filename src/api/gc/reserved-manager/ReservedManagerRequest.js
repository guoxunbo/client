import ReservedManagerRequestHeader from './ReservedManagerRequestHeader';
import ReservedManagerRequestBody from './ReservedManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class ReservedManagerRequest {

    static sendGetMaterialLot = (object) => {
        debugger;
        let requestBody = ReservedManagerRequestBody.buildGetMaterialLot(object.docLineRrn, object.tableRrn);
        let requestHeader = new ReservedManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCReservedUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendReserved= (object) => {
        let requestBody = ReservedManagerRequestBody.buildReserved(object.docLineRrn, object.materialLots);
        let requestHeader = new ReservedManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCReservedUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}

