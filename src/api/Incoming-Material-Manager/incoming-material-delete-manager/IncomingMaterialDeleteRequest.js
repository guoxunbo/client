import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';
import IncomingMaterialDeleteBody from './IncomingMaterialDeleteRequestBody';
import IncomingMaterialDeleteRequestHeader from './IncomingMaterialDeleteRequestHeader';

export default class IncomingMaterialDeleteRequest {
   
    static sendDeleteRequest = (object) => {
        let requestBody =  IncomingMaterialDeleteBody.buliedDelete(object.deleteNote, object.materialLotList);
        let requestHeader = new IncomingMaterialDeleteRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCIncomingMaterialDeleteUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}