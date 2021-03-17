import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import VcStockInRequestBody from "./VcStockInRequestBody";
import VcStockInRequestHeader from "./VcStockInRequestHeader";
import Request from '@api/Request';

export default class VcStockInRequest {

    static sendStockInRequest = (object) => {
        let requestBody = VcStockInRequestBody.buildStockIn(object);
        let requestHeader = new VcStockInRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMaterialLotStockInUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}
