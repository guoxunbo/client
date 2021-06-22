import StockInManagerRequestHeader from './StockInManagerRequestHeader';
import StockInManagerRequestBody from './StockInManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class StockInManagerRequest {

    static sendQueryRequest = (object) => {
        let requestBody = StockInManagerRequestBody.buildQuery(object.materialLotId, object.tableRrn);
        let requestHeader = new StockInManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCStockInUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendStockInRequest = (object) => {
        let requestBody = StockInManagerRequestBody.buildStockIn(object.materialLots);
        let requestHeader = new StockInManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCStockInUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendQueryWaferRequest = (object) => {
        let requestBody = StockInManagerRequestBody.buildQueryWafer(object.lotId, object.tableRrn);
        let requestHeader = new StockInManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCStockInUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendImportRequest = (object, file) => {
        let requestBody = new StockInManagerRequestBody();
        let requestHeader = new StockInManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCTempCpDataImportUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendImportData(requestObject, file);
    }

    static sendQueryRawMaterialRequest = (object) => {
        let requestBody = StockInManagerRequestBody.buildQueryRawMaterial(object.materialLotId, object.tableRrn);
        let requestHeader = new StockInManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCStockInUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendQueryByTableRrnAndLotIdRequest = (object) => {
        let requestBody = StockInManagerRequestBody.buildQueryByLotIdAndTableRrn(object.materialLotId, object.tableRrn);
        let requestHeader = new StockInManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCStockInUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }
}

