import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import VcStockOutRequestBody from "./VcStockOutRequestBody";
import VcStockOutRequestHeader from "./VcStockOutRequestHeader";
import Request from '@api/Request';

export default class VcStockOutRequest {

    static sendGetMaterialLot = (object)=>{
        let requestBody = VcStockOutRequestBody.buildGetMaterialLot(object.docLineId);
        let requestHeader = new VcStockOutRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCShipOutMLotUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendStockOutRequest = (object)=>{
        let requestBody = VcStockOutRequestBody.buildStockOut(object.docLineId, object.materialLots);
        let requestHeader = new VcStockOutRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCShipOutMLotUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }
}
