import Request from "@api/Request";
import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import VcImportExcelRequestBody from "./VcImportExcelRequestBody"
import VcImportExcelRequestHeader from "./VcImportExcelRequestHeader";


export default class VcImportExcelRequest {

    static sendImportExcelGetMLotRequest(object, file){
        let requestBody = VcImportExcelRequestBody.buildImportExcelGetMLotRequestBody(object.tableRrn);
        let requestHeader = new VcImportExcelRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCImportExcelManager);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendImportData(requestObject, file);
    }
}