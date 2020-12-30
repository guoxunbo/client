import IncomingMaterialReceiveRequestHeader from './IncomingMaterialReceiveRequestHeader';
import IncomingMaterialReceiveRequestBody from './IncomingMaterialReceiveRequestBody';
import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';



//来料接收
export default class IncomingMaterialReceiveRequest {
   
    static sendReceiveRequest = (object) => {
        let requestBody =  IncomingMaterialReceiveRequestBody.sendReceiveRequest(object.documentId, object.materialLotList);
        let requestHeader = new IncomingMaterialReceiveRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.IncomingMaterialImportReceiveUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetMaterialLot = (object) => {
        let requestBody =  IncomingMaterialReceiveRequestBody.sendGetMaterialLot(object.documentId);
        let requestHeader = new IncomingMaterialReceiveRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.IncomingMaterialImportReceiveUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    
}