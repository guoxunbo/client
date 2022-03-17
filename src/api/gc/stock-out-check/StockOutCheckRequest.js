import StockOutCheckRequestHeader from './StockOutCheckRequestHeader';
import StockOutCheckRequestBody from './StockOutCheckRequestBody';
import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';

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
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendGetCheckDataRequest = (object) => {
        let requestBody = StockOutCheckRequestBody.buildGetCheckData();
        let requestHeader = new StockOutCheckRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCStockOutCheckUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

}
