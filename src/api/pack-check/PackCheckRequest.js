import PackCheckRequestBody from "./PackCheckRequestBody";
import PackCheckRequestHeader from "./PackCheckRequestHeader";
import { UrlConstant } from "@const/ConstDefine";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";

export default class PackCheckRequest {
    
    static sendPackCheckRequest = (object) => {
        const {packCheckAction} = object;
        let requestBody = PackCheckRequestBody.buildPackCheck(packCheckAction)
        let requestHeader = new PackCheckRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCPackCheckUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }
}
