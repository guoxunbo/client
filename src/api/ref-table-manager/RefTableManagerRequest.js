import { UrlConstant } from "@const/ConstDefine";
import {Request} from "@api/Request";
import MessageUtils from "@utils/MessageUtils";
import RefTableManagerRequestBody from "./RefTableManagerRequestBody";
import RefTableManagerRequestHeader from "./RefTableManagerRequestHeader";
import RequestHeader from '@api/RequestHeader';

export default class RefTableManagerRequest {

    static sendGetDataRequest = (object) => {
        let requestBody = {};
        requestBody = RefTableManagerRequestBody.buildGetData(object.refTableName, object.parameters)
        let requestHeader = new RequestHeader();
        requestHeader.setMessageName("RefTableManage");
        // @ts-ignore
        let request = new Request(requestBody, UrlConstant.RefTableManagerUrl);
        let requestObject = {
            request: request,
            success: object.success,
            requestHeader: requestHeader
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
        let requestHeader = new RequestHeader();
        requestHeader.setOrgRrn(0);
        requestHeader.setMessageName("RefTableManage");
        // @ts-ignore
        let request = new Request(requestBody, UrlConstant.RefTableManagerUrl);
        let requestObject = {
            request: request,
            success: object.success,
            requestHeader: requestHeader
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }


}
