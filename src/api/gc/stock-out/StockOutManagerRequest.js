import StockOutManagerRequestHeader from './StockOutManagerRequestHeader';
import StockOutManagerRequestBody from './StockOutManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class StockOutManagerRequest {

    static sendStockOutRequest = (object) => {
        let {documentLine, materialLots} = object;
        let requestBody = StockOutManagerRequestBody.buildStockOut(documentLine, materialLots);
        let requestHeader = new StockOutManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCStockUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}

