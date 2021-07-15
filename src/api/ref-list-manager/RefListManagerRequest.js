import RefListManagerRequestBody from "./RefListManagerRequestBody";
import { UrlConstant } from "@const/ConstDefine";
import {Request} from "@api/Request";
import MessageUtils from "@utils/MessageUtils";
import { SystemRefListName } from '@api/const/ConstDefine';
import RequestHeader from '@api/RequestHeader';

export default class RefListManagerRequest {

    static sendGetDataRequest = (object) => {
        let requestBody = {};
        let referenceName = object.referenceName;
        if (object.owner) {
            requestBody = RefListManagerRequestBody.buildOwnerData(referenceName)
        } else {
            requestBody = RefListManagerRequestBody.buildSystemData(referenceName)
        }
        let requestHeader = new RequestHeader("RefListManage");
        // @ts-ignore
        let request = new Request( requestBody, UrlConstant.RefListMangerUrl);
        let requestObject = {
            request: request,
            success: object.success,
            requestHeader: requestHeader
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendGetLanguageRequest = (object) => {
        let requestBody = RefListManagerRequestBody.buildSystemData(SystemRefListName.Language)
        let requestHeader = new RequestHeader("RefListManage");
        requestHeader.setOrgRrn(0);
        // @ts-ignore
        let request = new Request( requestBody, UrlConstant.RefListMangerUrl);
        let requestObject = {
            request: request,
            success: object.success,
            requestHeader: requestHeader
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

}
