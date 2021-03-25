import RwMLotManagerRequestHeader from './RwMLotManagerRequestHeader';
import RwMLotManagerRequestBody from './RwMLotManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class RwMLotManagerRequest {

    static sendPrintLableRequest = (object) => {
        let {materialLotList} = object;
        let requestBody = RwMLotManagerRequestBody.buildGetPrintParam(materialLotList);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }


}

