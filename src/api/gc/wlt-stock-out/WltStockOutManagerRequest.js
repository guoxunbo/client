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

}

