import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import VcFinishGoodReceiveRequestBody from "./VcFinishGoodReceiveRequestBody";
import VcFinishGoodReceiveRequestHeader from "./VcFinishGoodReceiveRequestHeader";
import Request from '@api/Request';

export default class VcFinishGoodReceiveRequest {

    static sendGetMaterialLotRequest = (object)=>{
        let requestBody = VcFinishGoodReceiveRequestBody.buildGetMaterialLot(object.documentId);
        let requestHeader = new VcFinishGoodReceiveRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCFinishGoodReceiveUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendReceiveFinishGoodRequest = (object) => {
        let requestBody =  VcFinishGoodReceiveRequestBody.buildReceiveFinishGood(object.documentId, object.materialLotList);
        let requestHeader = new VcFinishGoodReceiveRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCFinishGoodReceiveUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }


}
