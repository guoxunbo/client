import MaterialLotStockInRequestHeader from './MaterialLotStockInRequestHeader';
import MaterialLotStockInRequestBody from './MaterialLotStockInRequestBody';
import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';

export default class MaterialLotStockInRequest {

    static sendStockInRequest = (object) => {
        let requestBody = MaterialLotStockInRequestBody.buildStockIn(object);
        let requestHeader = new MaterialLotStockInRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MaterialLotStockInUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }
}
