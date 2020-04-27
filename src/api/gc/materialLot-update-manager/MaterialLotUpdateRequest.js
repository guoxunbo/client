import MaterialLotUpdateRequestHeader from './MaterialLotUpdateRequestHeader';
import MaterialLotUpdateRequestBody from './MaterialLotUpdateRequestBody';
import Request from '../../Request';
import MessageUtils from '../../utils/MessageUtils';
import { UrlConstant } from "../../const/ConstDefine";

export default class MaterialLotUpdateRequest {
    
    static sendUpdateRequest = (object) => {
        let requestBody = MaterialLotUpdateRequestBody.buildUpdateInfo(object.treasuryeNote, object.materialLotList);
        let requestHeader = new MaterialLotUpdateRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCUpdateMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}