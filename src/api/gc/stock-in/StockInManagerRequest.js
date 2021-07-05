import StockInManagerRequestHeader from './StockInManagerRequestHeader';
import StockInManagerRequestBody from './StockInManagerRequestBody';
import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';

export default class StockInManagerRequest {

    static sendQueryRequest = (object) => {
        let requestBody = StockInManagerRequestBody.buildQuery(object.materialLotId);
        let requestHeader = new StockInManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCStockInUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
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
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }
    
}

