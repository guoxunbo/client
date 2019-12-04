import TreeManagerRequestBody from "./TreeManagerRequestBody";
import TreeManagerRequestHeader from "./TreeManagerRequestHeader";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";
import { UrlConstant } from "@const/ConstDefine";

export default class TreeManagerRequest {

    static sendLoadTreeRequest = (object) => {
        let requestBody = TreeManagerRequestBody.buildLoadTree(object.group);
        let requestHeader = new TreeManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.TreeManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
    static sendLoadNextNodeRequest = (object) => {
        let requestBody = TreeManagerRequestBody.buildLoadNextNode(object.currentNode, object.currentObject);
        let requestHeader = new TreeManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.TreeManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

   

}