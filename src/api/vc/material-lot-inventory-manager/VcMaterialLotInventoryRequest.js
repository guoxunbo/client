import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import VcMaterialLotInventoryRequestBody from "./VcMaterialLotInventoryRequestBody";
import VcMaterialLotInventoryRequestHeader from "./VcMaterialLotInventoryRequestHeader";
import Request from '@api/Request';

export default class VcMaterialLotInventoryRequest {

    static sendPickRequest = (object)=>{
        let requestBody = VcMaterialLotInventoryRequestBody.buildPick(object.materialLots);
        let requestHeader = new VcMaterialLotInventoryRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCInventoryManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetStockOutMLotByOrderRequest = (object) => {
        let requestBody = VcMaterialLotInventoryRequestBody.buildGetStockOutMLotByOrder(object.documentId);
        let requestHeader = new VcMaterialLotInventoryRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCInventoryManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}
