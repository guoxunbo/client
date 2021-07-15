import AppendPackageMaterialLotRequestBody from "./AppendPackageMaterialLotRequestBody";
import AppendPackageMaterialLotRequestHeader from "./AppendPackageMaterialLotRequestHeader";
import { UrlConstant } from "@const/ConstDefine";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";

export default class AppendPackageMaterialLotRequest {

    static sendAppendPackMaterialLotsRequest = (object) => {
        const {packedMaterialLotId, waitToPackMaterialLots, actionCode, actionReason, actionComment} = object;
        let requestBody = AppendPackageMaterialLotRequestBody.buildAppendPackMaterialLots(packedMaterialLotId, waitToPackMaterialLots, actionCode, actionReason, actionComment)
        let requestHeader = new AppendPackageMaterialLotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCAppendPackMaterialLotsUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

}
