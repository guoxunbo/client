import { UrlConstant } from "@const/ConstDefine";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";
import RefTableManagerRequestBody from "./RefTableManagerRequestBody";
import RefTableManagerRequestHeader from "./RefTableManagerRequestHeader";

export default class RefTableManagerRequest {

    static sendGetDataRequest = (object) => {
        let requestBody = {};
        requestBody = RefTableManagerRequestBody.buildGetData(object.refTableName, object.parameters)
        let requestHeader = new RefTableManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.RefTableManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 获取区域使用OrgRrn是0
     */
    static sendGetOrgRequest = (object) => {
        let requestBody = {};
        requestBody = RefTableManagerRequestBody.buildGetData(object.refTableName, object.parameters)
        let requestHeader = new RefTableManagerRequestHeader();
        requestHeader.orgRrn = 0;
        let request = new Request(requestHeader, requestBody, UrlConstant.RefTableManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }


}
