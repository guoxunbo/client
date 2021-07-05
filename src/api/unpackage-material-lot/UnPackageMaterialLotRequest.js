import UnPackageMaterialLotRequestBody from "./UnPackageMaterialLotRequestBody";
import UnPackageMaterialLotRequestHeader from "./UnPackageMaterialLotRequestHeader";
import { UrlConstant } from "@const/ConstDefine";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";

export default class UnPackageMaterialLotRequest {

    static sendUnPackMaterialLotsRequest = (object) => {
        const {packedLotDetails, actionCode, actionReason, actionComment} = object;
        let requestBody = UnPackageMaterialLotRequestBody.buildUnPackMaterialLot(packedLotDetails, actionCode, actionReason, actionComment)
        let requestHeader = new UnPackageMaterialLotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCUnPackMaterialLotsUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }
    
}
