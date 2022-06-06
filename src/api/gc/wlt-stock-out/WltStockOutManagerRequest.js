import WltStockOutManagerRequestHeader from './WltStockOutManagerRequestHeader';
import WltStockOutManagerRequestBody from './WltStockOutManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class WltStockOutManagerRequest {

    static sendGCRWAttributeChangeRequest = (object) => {
        let {materialLots} = object;
        let requestBody = WltStockOutManagerRequestBody.buildGCRWAttributeChange(materialLots);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendWltStockOutRequest = (object) => {
        let {documentLines, materialLots, checkSubCode} = object;
        let requestBody = WltStockOutManagerRequestBody.buildWltStockOut(documentLines, materialLots, checkSubCode);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendWltOtherStockOutRequest = (object) => {
        let {documentLines, materialLots} = object;
        let requestBody = WltStockOutManagerRequestBody.buildWltOtherStockOut(documentLines, materialLots);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendWltShipByOrderRequest = (object) => {
        let {documentLine, materialLots} = object;
        let requestBody = WltStockOutManagerRequestBody.buildWltShipByOrder(documentLine, materialLots);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendHNSampleCollectionStockOutRequest = (object) => {
        let {documentLines, materialLots} = object;
        let requestBody = WltStockOutManagerRequestBody.buildHNSampleCollectionStockOut(documentLines, materialLots);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendHNWarehouseWltOtherStockOutRequest = (object) => {
        let {documentLines, materialLots} = object;
        let requestBody = WltStockOutManagerRequestBody.buildHNWarehouseWltOtherStockOut(documentLines, materialLots);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendWltThreeSideShipRequest = (object) => {
        let {documentLine, materialLots} = object;
        let requestBody = WltStockOutManagerRequestBody.buildThreeSideShip(documentLine, materialLots);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendValidationRequest = (object) => {
        let {queryMaterialLot, materialLots} = object;
        let requestBody = WltStockOutManagerRequestBody.buildValidateMLot(queryMaterialLot, materialLots);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetStockOutTagMLotUnits = (object) => {
        let {materialLots} = object;
        let requestBody = WltStockOutManagerRequestBody.buildGetStockOutTagMLotUnit(materialLots);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendStockOutTagRequest = (object) => {
        let {materialLots, stockTagNote, customerName, stockOutType, poId, address} = object;
        let requestBody = WltStockOutManagerRequestBody.buildStockOutTagging(materialLots, stockTagNote, customerName, stockOutType, poId, address);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendUnstockOutTagRequest =(object) => {
        let {materialLots} = object;
        let requestBody = WltStockOutManagerRequestBody.buildUnstockOutTagging(materialLots);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendValidateMlotVenderRequest =(object) =>{
        let {materialLots} = object;
        let requestBody = WltStockOutManagerRequestBody.buildValidationVender(materialLots);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetMaterialLotByRrnRequest = (object) => {
        let requestBody = WltStockOutManagerRequestBody.buildGetMaterialLot(object.tableRrn, object.queryLotId);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendValidateMlotMaterialNameRequest =(object) =>{
        let {materialLots} = object;
        let requestBody = WltStockOutManagerRequestBody.buildValidationMaterialName(materialLots);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendSaleStockOutRequest = (object) => {
        let {documentLines, materialLots, checkSubCode} = object;
        let requestBody = WltStockOutManagerRequestBody.buildSaleStockOut(documentLines, materialLots, checkSubCode);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendSaleAndthreeSideStockOutRequest = (object) => {
        debugger;
        let {documentLine, materialLots, checkSubCode} = object;
        let requestBody = WltStockOutManagerRequestBody.buildSaleAndthreeSideStockOut(documentLine, materialLots, checkSubCode);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
    static sendMobileWltStockOutRequest = (object) => {
        let {materialLots, checkSubCode, erpTime} = object;
        let requestBody = WltStockOutManagerRequestBody.buildMobileWltStockOut(materialLots, checkSubCode, erpTime);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendMobileSaleStockOutRequest = (object) => {
        let {materialLots, checkSubCode, erpTime} = object;
        let requestBody = WltStockOutManagerRequestBody.buildMobileSaleStockOut(materialLots, checkSubCode, erpTime);
        let requestHeader = new WltStockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWltStockOutUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}

