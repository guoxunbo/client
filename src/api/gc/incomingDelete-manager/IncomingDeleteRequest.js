import IncomingDeleteRequestHeader from './IncomingDeleteRequestHeader';
import IncomingDeleteRequestBody from './IncomingDeleteRequestBody';
import Request from '../../Request';
import MessageUtils from '../../utils/MessageUtils';
import { UrlConstant } from "../../const/ConstDefine";

export default class IncomingDeleteRequest {
    
    static sendDeleteRequest = (object) => {
        let requestBody = IncomingDeleteRequestBody.buildDelete(object.dataList, object.deleteNote);
        let requestHeader = new IncomingDeleteRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCIncomingMaterialDelete);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendDeleteCOGDetialRequest = (object) => {
        let requestBody = IncomingDeleteRequestBody.buildDeleteCOGDetial(object.dataList, object.deleteNote);
        let requestHeader = new IncomingDeleteRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCIncomingMaterialDelete);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendDeleteCOGEcretiveRequest = (object) => {
        let requestBody = IncomingDeleteRequestBody.buildDeleteCOGEcretive(object.dataList, object.deleteNote);
        let requestHeader = new IncomingDeleteRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCIncomingMaterialDelete);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}