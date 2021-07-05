import RefListManagerRequestBody from "./RefListManagerRequestBody";
import RefListManagerRequestHeader from "./RefListManagerRequestHeader";
import { UrlConstant } from "@const/ConstDefine";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";
import { SystemRefListName } from '@api/const/ConstDefine';

export default class RefListManagerRequest {

    static sendGetDataRequest = (object) => {
        let requestBody = {};
        let referenceName = object.referenceName;
        if (object.owner) {
            requestBody = RefListManagerRequestBody.buildOwnerData(referenceName)
        } else {
            requestBody = RefListManagerRequestBody.buildSystemData(referenceName)
        }
        let requestHeader = new RefListManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.RefListMangerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendGetLanguageRequest = (object) => {
        let requestBody = RefListManagerRequestBody.buildSystemData(SystemRefListName.Language)
        let requestHeader = new RefListManagerRequestHeader();
        requestHeader.orgRrn = 0;
        let request = new Request(requestHeader, requestBody, UrlConstant.RefListMangerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

}
