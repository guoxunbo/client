import RwMaterialManagerRequestHeader from './RwMaterialManagerRequestHeader';
import RwMaterialManagerRequestBody from './RwMaterialManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class RwMaterialManagerRequest {

    static sendGetMaterialLotByTapeCode = (object) => {
        let {tapeMaterialCode} = object;
        let requestBody = RwMaterialManagerRequestBody.buildGetMaterialLotByTapeCode(tapeMaterialCode);
        let requestHeader = new RwMaterialManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendReceiveTapeMaterial = (object) => {
        let {materialLotList} = object;
        let requestBody = RwMaterialManagerRequestBody.buildReceiveTape(materialLotList);
        let requestHeader = new RwMaterialManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}

