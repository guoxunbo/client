import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import VcDeliveryOrderRequestBody from "./VcDeliveryOrderRequestBody";
import VcDeliveryOrderRequestHeader from "./VcDeliveryOrderRequestHeader";
import Request from '@api/Request';

export default class VcDeliveryOrderRequest {

    static sendSaveRequest = (object)=>{
        let requestBody = VcDeliveryOrderRequestBody.buildSave(object.documentLineList);
        let requestHeader = new VcDeliveryOrderRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSDeliveryOrderSavetUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendApproveRequest = (object)=>{
        let requestBody = VcDeliveryOrderRequestBody.buildApproveRequest(object.documentId);
        let requestHeader = new VcDeliveryOrderRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSDeliveryOrderSavetUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}
