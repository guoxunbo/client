import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import VcFinishGoodReservedRequestBody from "./VcFinishGoodReservedRequestBody";
import VcFinishGoodReservedRequestHeader from "./VcFinishGoodReservedRequestHeader";
import Request from '@api/Request';

export default class VcFinishGoodReservedRequest {

    /**
     * 获得物料批次by发货单
     * @param {*} object 
     */
    static sendGetMaterialLot = (object)=>{
        let requestBody = VcFinishGoodReservedRequestBody.buildGetMaterialLot(object.documentLine);
        let requestHeader = new VcFinishGoodReservedRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCFinishGoodReservedUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendGetReservedMLotByStandardQty = (object)=>{
        let requestBody = VcFinishGoodReservedRequestBody.buildGetReservedMLotByStandardQty(object.documentLine, object.standardQty);
        let requestHeader = new VcFinishGoodReservedRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCFinishGoodReservedUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 备货
     * @param {*} object 
     */
    static sentReserved = (object)=>{
        let requestBody = VcFinishGoodReservedRequestBody.buildReserved(object.documentLine, object.materialLotList, object.remake);
        let requestHeader = new VcFinishGoodReservedRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCFinishGoodReservedUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendPrintReservedOrder=(object)=>{
        let requestBody = VcFinishGoodReservedRequestBody.buildPrintReservedOrder(object.documentLine);
        let requestHeader = new VcFinishGoodReservedRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCFinishGoodReservedUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 取消备货
     * @param {*} object 
     */
    static sentUnReserved=(object)=>{
        let requestBody = VcFinishGoodReservedRequestBody.buildUnReserved(object.materialLotList);
        let requestHeader = new VcFinishGoodReservedRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCFinishGoodReservedUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }
}
