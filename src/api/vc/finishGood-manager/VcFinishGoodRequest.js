import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import VcFinishGoodRequestBody from "./VcFinishGoodRequestBody";
import VcFinishGoodRequestHeader from "./VcFinishGoodRequestHeader";
import Request from '@api/Request';

export default class VcFinishGoodRequest {

    static sendGetMaterialLot = (object)=>{
        let requestBody = VcFinishGoodRequestBody.buildGetMaterialLot(object.documentId);
        let requestHeader = new VcFinishGoodRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCFinishGoodReceiveUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendFinishGoodReceiveRequest = (object)=>{
        let requestBody = VcFinishGoodRequestBody.buildReceive(object.documentId, object.materialLots);
        let requestHeader = new VcFinishGoodRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCFinishGoodReceiveUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}
