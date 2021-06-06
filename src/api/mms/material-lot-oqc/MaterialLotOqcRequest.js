import MaterialLotOqcRequestBody from "./MaterialLotOqcRequestBody";
import MaterialLotOqcRequestHeader from "./MaterialLotOqcRequestHeader";
import { UrlConstant } from "@const/ConstDefine";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";

export default class MaterialLotOqcRequest {

    static sendOqcRequest = (object) => {
        let requestBody = MaterialLotOqcRequestBody.buildOqc(object.materialCheckSheet);
        let requestHeader = new MaterialLotOqcRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MateiralLotOqcUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}