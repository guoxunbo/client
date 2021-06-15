import GCRawMaterialImportRequestHeader from './GCRawMaterialImportRequestHeader';
import GCRawMaterialImportRequestBody from './GCRawMaterialImportRequestBody';
import Request from '../../Request';
import MessageUtils from '../../utils/MessageUtils';
import { UrlConstant } from "../../const/ConstDefine";

export default class GCRawMaterialImportRequest {

    static sendGCUnRawMaterialSpare= (object) => {
        let requestBody = GCRawMaterialImportRequestBody.buildGCUnRawMaterialSpare(object.materialLots);
        let requestHeader = new GCRawMaterialImportRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRawMaterialImportSaveDateUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
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

    static sendRawMaterialIssueRequest = (object) => {
        let requestBody = GCRawMaterialImportRequestBody.buildRawMaterialIssue(object.materialLots, object.documentLineList, object.issueWithDoc);
        let requestHeader = new GCRawMaterialImportRequestHeader();
        let request = new Request(requestHeader,requestBody,UrlConstant.GCRawMaterialImportSaveDateUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendScrapRawMaterialRequest = (object) => {
        let {materialLotList, reason, remarks} = object;
        let requestBody = GCRawMaterialImportRequestBody.buildScrapRawMaterial(materialLotList, reason, remarks);
        let requestHeader = new GCRawMaterialImportRequestHeader();
        let request = new Request(requestHeader,requestBody,UrlConstant.GCRawMaterialImportSaveDateUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendDeleteRawMaterialRequest = (object) => {
        let {materialLotList, deleteNote} = object;
        let requestBody = GCRawMaterialImportRequestBody.buildDeleteRawMaterial(materialLotList, deleteNote);
        let requestHeader = new GCRawMaterialImportRequestHeader();
        let request = new Request(requestHeader,requestBody,UrlConstant.GCRawMaterialImportSaveDateUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
    static sendGetWaitSpareRawMaterialLot = (object) => {
        let {docLineRrn, tableRrn} = object;
        let requestBody = GCRawMaterialImportRequestBody.buildGetWaitSpareRawMaterialLot(docLineRrn, tableRrn);
        let requestHeader = new GCRawMaterialImportRequestHeader();
        let request = new Request(requestHeader,requestBody,UrlConstant.GCRawMaterialImportSaveDateUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetSpareRawMLotByDocLine = (object) => {
        let {materialLotList, docLineRrn} = object;
        let requestBody = GCRawMaterialImportRequestBody.buildGetSpareRawMaterialLot(materialLotList, docLineRrn);
        let requestHeader = new GCRawMaterialImportRequestHeader();
        let request = new Request(requestHeader,requestBody,UrlConstant.GCRawMaterialImportSaveDateUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendSpareRawMLotByDocLine = (object) => {
        let {materialLotList, docLineRrn} = object;
        let requestBody = GCRawMaterialImportRequestBody.buildSpareRawMaterialLot(materialLotList, docLineRrn);
        let requestHeader = new GCRawMaterialImportRequestHeader();
        let request = new Request(requestHeader,requestBody,UrlConstant.GCRawMaterialImportSaveDateUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetDataByLotIdAndTableRrnRequest = (object) => {
        let {queryLotId, tableRrn} = object;
        let requestBody = GCRawMaterialImportRequestBody.buildGetDataByLotIdAndTableRrn(queryLotId, tableRrn);
        let requestHeader = new GCRawMaterialImportRequestHeader();
        let request = new Request(requestHeader,requestBody,UrlConstant.GCRawMaterialImportSaveDateUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendScrapRawMaterialShipRequest = (object) => {
        let {documentLine, materialLotList} = object;
        let requestBody = GCRawMaterialImportRequestBody.buildScrapRawMaterialShip(documentLine, materialLotList);
        let requestHeader = new GCRawMaterialImportRequestHeader();
        let request = new Request(requestHeader,requestBody,UrlConstant.GCRawMaterialImportSaveDateUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    
}