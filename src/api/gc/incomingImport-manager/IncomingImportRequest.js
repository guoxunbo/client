import IncomingImportRequestHeader from './IncomingImportRequestHeader';
import IncomingImportRequestBody from './IncomingImportRequestBody';
import Request from '../../Request';
import MessageUtils from '../../utils/MessageUtils';
import { UrlConstant } from "../../const/ConstDefine";

export default class IncomingImportRequest {
    
    static sendSelectRequest = (object, file) => {
        let requestBody = IncomingImportRequestBody.buildSelectFile(object.importType, object.fileName);
        let requestHeader = new IncomingImportRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCIncomingImportUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendImportData(requestObject, file);
    }

    static sendImportRequest = (object) => {
        let requestBody = IncomingImportRequestBody.buildImportInfo(object.importType, object.warehouseId, object.dataList);
        let requestHeader = new IncomingImportRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCIncomingMaterialSave);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}