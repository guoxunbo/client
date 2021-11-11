import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import UpdateMLotRequestBody from "./UpdateMLotRequestBody";
import UpdateMLotRequestHeader from "./UpdateMLotRequestHeader";
import Request from '@api/Request';

export default class UpdateMLotRequest {

    static sentAddRmaNoRequest = (object) => {
        let requestBody =  new UpdateMLotRequestBody.buildAddRmaNoRequest(object.materialLotList, object.materialLotAction);
        let requestHeader = new UpdateMLotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCUpdateMLotManager);
        let requestObject = {
            request: request,
            success: object.success,
        }
        MessageUtils.sendRequest(requestObject);
    }
}
