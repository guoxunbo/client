import Request from "../../Request";
import { UrlConstant } from "../../const/ConstDefine";
import MessageUtils from "../../utils/MessageUtils";
import WaferUnpackMLotRequestBody from "./WaferUnpackMLotRequestBody";
import WaferUnpackMLotRequestHeader from "./WaferUnpackMLotRequestHeader";

export default class WaferUnpackMLotRequest {

    static sendWaferUnpackRequest = (object) => {
        let {materialLotUnits} = object;
        let requestBody = WaferUnpackMLotRequestBody.buildWaferUnpack(materialLotUnits);
        let requestHeader = new WaferUnpackMLotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWaferUnpackUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}