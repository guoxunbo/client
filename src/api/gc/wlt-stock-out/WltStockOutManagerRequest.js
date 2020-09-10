import WltStockOutManagerRequestHeader from './WltStockOutManagerRequestHeader';
import WltStockOutManagerRequestBody from './WltStockOutManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class WltStockOutManagerRequest {

    static sendWltStockOutRequest = (object) => {
        let {documentLine, materialLots} = object;
        let requestBody = WltStockOutManagerRequestBody.buildWltStockOut(documentLine, materialLots);
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
        let {materialLots, stockTagNote, customerName, stockOutType, poId} = object;
        let requestBody = WltStockOutManagerRequestBody.buildStockOutTagging(materialLots, stockTagNote, customerName, stockOutType, poId);
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
}

