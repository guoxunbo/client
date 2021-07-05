import PackageMaterialLotRequestBody from "./PackageMaterialLotRequestBody";
import PackageMaterialLotRequestHeader from "./PackageMaterialLotRequestHeader";
import { UrlConstant } from "@const/ConstDefine";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";

export default class PackageMaterialLotRequest {

    static sendPackMaterialLotsRequest = (object) => {
        const {materialLots, packageType, actionCode, actionReason, actionComment} = object;
        let requestBody = PackageMaterialLotRequestBody.buildPackMaterialLots(materialLots, packageType, actionCode, actionReason, actionComment)
        let requestHeader = new PackageMaterialLotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCPackMaterialLotsUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }
    
    static sendPrintPackMLotRequest = (object) => {
        let requestBody = PackageMaterialLotRequestBody.buildPrintPackageMLot(object.materialLotId)
        let requestHeader = new PackageMaterialLotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCPackMaterialLotsUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }
}
