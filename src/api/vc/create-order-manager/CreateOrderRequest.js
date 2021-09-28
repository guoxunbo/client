import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import CreateOrderRequestBody from "./CreateOrderRequestBody";
import CreateOrderRequestHeader from "./CreateOrderRequestHeader";
import Request from '@api/Request';

export default class CreateOrderRequest {

    static sendCreateOrderRequest = (object)=>{
        let requestBody = CreateOrderRequestBody.buildOrder(object.document);
        let requestHeader = new CreateOrderRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCCreateOrderManager);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendCreateOrderLineRequest = (object)=>{
        let requestBody = CreateOrderRequestBody.buildOrderLine(object.documentLine);
        let requestHeader = new CreateOrderRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCCreateOrderManager);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}
