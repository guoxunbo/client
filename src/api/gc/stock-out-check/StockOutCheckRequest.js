import StockOutCheckRequestHeader from './StockOutCheckRequestHeader';
import StockOutCheckRequestBody from './StockOutCheckRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class StockOutCheckRequest {

    static sendJudgeMaterialLotRequest = (object) => {
        const {materialLots, checkList} = object;
        let requestBody = StockOutCheckRequestBody.buildJudge(materialLots, checkList);
        let requestHeader = new StockOutCheckRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCStockOutCheckUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetCheckDataRequest = (object) => {
        let requestBody = StockOutCheckRequestBody.buildGetCheckData();
        let requestHeader = new StockOutCheckRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCStockOutCheckUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetWltCheckDataRequest = (object) => {
        let requestBody = StockOutCheckRequestBody.buildGetWltCheckData();
        let requestHeader = new StockOutCheckRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCStockOutCheckUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetDataByRrnRequest = (object) => {
        let requestBody = StockOutCheckRequestBody.buildGetWaitCheckMLot(object.tableRrn, object.queryMLotId);
        let requestHeader = new StockOutCheckRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCStockOutCheckUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}