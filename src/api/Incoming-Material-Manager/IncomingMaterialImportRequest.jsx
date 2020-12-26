import IncomingMaterialImportRequestHeader from './IncomingMaterialImportRequestHeader.jsx';
import IncomingMaterialImportRequestBody from './IncomingMaterialImportRequestBody';
import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';

export default class IncomingMaterialImportRequest {
   
    static sendSelectRequest = (object, file) => {
        let requestBody = new IncomingMaterialImportRequestBody();;
        let requestHeader = new IncomingMaterialImportRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCIncomingMaterialImportUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendImportData(requestObject,file);
    }

    static sendImportRequest = (object) => {
        let requestBody = IncomingMaterialImportRequestBody.buildImportInfo(object.dataList);
        let requestHeader = new IncomingMaterialImportRequestHeader();
        let request = new Request(requestHeader,requestBody,UrlConstant.VCIncomingMaterialImportSaveDateUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}