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

    static sendCheckInventoryRequest = (object)=>{
        let requestBody = VcMaterialLotInventoryRequestBody.checkInventory(object.materialLots);
        let requestHeader = new VcMaterialLotInventoryRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCInventoryManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
     * 出库
     * @param {*} object 
     */
    static sendStockOutSpareMLotRequest = (object) => {
        let requestBody = VcMaterialLotInventoryRequestBody.buildStockOutSpareMLot(object.formObject);
        let requestHeader = new VcMaterialLotInventoryRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCInventoryManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
     * 备品备件 退料入库
     */
     static sendReturnSpareMaterialLotRequest = (object) => {
        let requestBody = VcMaterialLotInventoryRequestBody.buildReturnSpareMaterialLot(object.formObject);
        let requestHeader = new VcMaterialLotInventoryRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCInventoryManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
     * 备品备件 创建入库
     */
    static sendCreateSpareMaterialLotRequest = (object) => {
        let requestBody = VcMaterialLotInventoryRequestBody.buildCreateSpareMaterialLot(object.formObject);
        let requestHeader = new VcMaterialLotInventoryRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCInventoryManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}
