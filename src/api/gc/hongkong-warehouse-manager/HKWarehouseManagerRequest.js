import HKWarehouseManagerRequestHeader from './HKWarehouseManagerRequestHeader';
import HKWarehouseManagerRequestBody from './HKWarehouseManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class HKWarehouseManagerRequest {

    static sendHKStockOutRequest = (object) => {
        let {documentLines, materialLots} = object;
        let requestBody = HKWarehouseManagerRequestBody.buildHKWarehouseStockOut(documentLines, materialLots);
        let requestHeader = new HKWarehouseManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCHKWarehouseManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendValidationRequest = (object) => {
        let {queryMaterialLot, materialLots} = object;
        let requestBody = HKWarehouseManagerRequestBody.buildValidateMLot(queryMaterialLot, materialLots);
        let requestHeader = new HKWarehouseManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCHKWarehouseManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetMaterialLotByRrnRequest = (object) => {
        let requestBody = HKWarehouseManagerRequestBody.buildGetMaterialLot(object.tableRrn, object.queryLotId);
        let requestHeader = new HKWarehouseManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCHKWarehouseManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendHKByOrderStockOutRequest = (object) => {
        let {documentLines, materialLots} = object;
        let requestBody = HKWarehouseManagerRequestBody.buildHKByOrderStockOut(documentLines, materialLots);
        let requestHeader = new HKWarehouseManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCHKWarehouseManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}

