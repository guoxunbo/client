import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';
import ReturnLotOrderRequestBody from './ReturnLotOrderRequestBody';
import ReturnLotOrderRequestHeader from './ReturnLotOrderRequestHeader';

export default class ReturnLotOrderRequest {
   
    static sendGetReturnLotInfoRequest = (object) => {
        let requestBody =  ReturnLotOrderRequestBody.buildGetReturnLotInfo(object.documentId);
        let requestHeader = new ReturnLotOrderRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSReturnMLotByDocUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendReturnLotRequest = (object) => {
        let requestBody = ReturnLotOrderRequestBody.buildReturnLot(object.documentId, object.materialLots);
        let requestHeader = new ReturnLotOrderRequestHeader();
        let request = new Request(requestHeader,requestBody, UrlConstant.VCReturnMLotByDocUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}