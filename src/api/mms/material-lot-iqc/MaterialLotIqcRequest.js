import MaterialLotIqcRequestBody from "./MaterialLotIqcRequestBody";
import MaterialLotIqcRequestHeader from "./MaterialLotIqcRequestHeader";
import { UrlConstant } from "@const/ConstDefine";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";

export default class MaterialLotIqcRequest {

    static sendIqcRequest = (object) => {
        let requestBody = MaterialLotIqcRequestBody.buildIqc(object.materialCheckSheet);
        let requestHeader = new MaterialLotIqcRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MateiralLotIqcUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}