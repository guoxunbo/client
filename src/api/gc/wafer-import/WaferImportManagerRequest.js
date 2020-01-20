import Request from "../../Request";
import MessageUtils from "../../utils/MessageUtils";
import { UrlConstant } from "../../const/ConstDefine";
import WaferImportManagerRequestBody from "./WaferImportManagerRequestBody";
import WaferImportManagerRequestHeader from "./WaferImportManagerRequestHeader";

export default class WaferImportManagerRequest {

    static sendShowRequest = (object, file) => {
        let requestBody = WaferImportManagerRequestBody.buildShow(object.tableRrn);
        let requestHeader = new WaferImportManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMWaferShowUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendImportData(requestObject, file);
    }

    static sendImportRequest = (object) => {
        let requestBody = WaferImportManagerRequestBody.buildImportInfo(object.tableRrn,object.list);
        let requestHeader = new WaferImportManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.WaferImportUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}



