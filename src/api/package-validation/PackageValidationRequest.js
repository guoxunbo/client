import PackageValidationRequestBody from "./PackageValidationRequestBody";
import PackageValidationRequestHeader from "./PackageValidationRequestHeader";
import { UrlConstant } from "@const/ConstDefine";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";

export default class PackageValidationRequest {

    static sendValidationPackRequest = (object) => {
        const {materialLots, packageType} = object;
        let requestBody = PackageValidationRequestBody.buildValidationPackageBody(materialLots, packageType)
        let requestHeader = new PackageValidationRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.ValidationPackMaterialLotsUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }
    
    static sendValidationAppendPackRequest = (object) => {
        const {materialLots, packagedMaterialLotId, packageType} = object;
        let requestBody = PackageValidationRequestBody.buildValidationAppendBody(materialLots, packagedMaterialLotId, packageType)
        let requestHeader = new PackageValidationRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.ValidationPackMaterialLotsUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

}
