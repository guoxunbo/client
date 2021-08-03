import StandardSplitMLotRequestBody from "./StandardSplitMLotRequestBody";
import StandardSplitMLotRequestHeader from "./StandardSplitMLotRequestHeader";
import { UrlConstant } from "@const/ConstDefine";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";

export default class StandardSplitMLotRequest {

    static sendStandardSplitReuqest = (object) => {
        let requestBody = StandardSplitMLotRequestBody.buildBody(object.materialLotId, object.standardQty);
        let requestHeader = new StandardSplitMLotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.StandardSplitMLotUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}