import TreeManagerRequestBody from "./TreeManagerRequestBody";
import TreeManagerRequestHeader from "./TreeManagerRequestHeader";
import Request from "@api/Request";
import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";

export default class TreeManagerRequest {

    static sendGetByCategoryRequest = (object) => {
        let requestBody = TreeManagerRequestBody.buildGetByCategory(object.category);
        let requestHeader = new TreeManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.TreeManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendGetTreeDataRequest = (object) => {
        let requestBody = TreeManagerRequestBody.buildGetTreeData(object.treeNode, object.parentObject);
        let requestHeader = new TreeManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.TreeManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

}
