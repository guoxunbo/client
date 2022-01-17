import HNWarehouseImportRequestHeader from './HNWarehouseImportRequestHeader';
import HNWarehouseImportRequestBody from './HNWarehouseImportRequestBody';
import Request from '../../Request';
import MessageUtils from '../../utils/MessageUtils';
import { UrlConstant } from "../../const/ConstDefine";

export default class HNWarehouseImportRequest {
    

    static sendHNWarehouseImportRequest = (object) => {
        debugger;
        let requestBody = HNWarehouseImportRequestBody.buildHNWarehouseImportInfo(object.importType, object.dataList);
        let requestHeader = new HNWarehouseImportRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCHNWarehouseImportSaveUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}