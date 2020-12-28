import GCRawMaterialImportRequestHeader from './GCRawMaterialImportRequestHeader';
import GCRawMaterialImportRequestBody from './GCRawMaterialImportRequestBody';
import Request from '../../Request';
import MessageUtils from '../../utils/MessageUtils';
import { UrlConstant } from "../../const/ConstDefine";

export default class GCRawMaterialImportRequest {
    
    static sendSelectRequest = (object, file) => {
        let requestBody = GCRawMaterialImportRequestBody.buildSelectFile();
        let requestHeader = new GCRawMaterialImportRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRawMaterialImportUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendImportData(requestObject,file);
    }

    static sendImportRequest = (object) => {
        let requestBody = GCRawMaterialImportRequestBody.buildImportInfo(object.dataList,object.importType);
        let requestHeader = new GCRawMaterialImportRequestHeader();
        let request = new Request(requestHeader,requestBody,UrlConstant.GCRawMaterialImportSaveDateUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendReceiveRawMaterialRequest = (object) => {
        let requestBody = GCRawMaterialImportRequestBody.buildReceiveRawMaterial(object.materialLots);
        let requestHeader = new GCRawMaterialImportRequestHeader();
        let request = new Request(requestHeader,requestBody,UrlConstant.GCRawMaterialImportSaveDateUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }


}