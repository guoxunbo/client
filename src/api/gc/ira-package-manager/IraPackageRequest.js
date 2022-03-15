import { UrlConstant } from "../../const/ConstDefine";
import MessageUtils from "../../utils/MessageUtils";
import IraPackageRequestBody from "./IraPackageRequestBody";
import IraPackageRequestHeader from "./IraPackageRequestHeader";
import Request from '../../Request';
 
export default class IraPackageRequest{
    static sendPackMaterialLotsRequest = (object) => {
        const {materialLots, packageType, actionCode, actionReason, actionComment} = object;
        let requestBody = IraPackageRequestBody.buildPackMaterialLots(materialLots, packageType, actionCode, actionReason, actionComment)
        let requestHeader = new IraPackageRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCIRAPackageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}