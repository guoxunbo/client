import MobileRequestBody from "./MobileRequestBody";
import MobileRequestHeader from "./MobileRequestHeader";
import { UrlConstant } from "@const/ConstDefine";
import Request from "@api/Request";
import MessageUtils from "@utils/MessageUtils";

export default class MobileRequest {

    static sendReceiveMLotRequest = (object) => {
        const {documentId, materialLotId, qty} = object;
        let requestBody = MobileRequestBody.buildReceiveMLot(documentId, materialLotId, qty)
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
    static sendStockInRequest = (object) => {
        const {materialLotId, storageId} = object;
        let requestBody = MobileRequestBody.buildStockIn(materialLotId, storageId);
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
     * 来料根据单据入库验证
     * @param {} object 
     */
    static sendValidateStockInByOrderRequest = (object) => {
        let requestBody = MobileRequestBody.buildValidateStockInByOrder(object.incomingOrderId, object.materialLots);
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl)
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
     * 来料根据单据入库
     * @param {*} object 
     */
    static sendIncomingStockInByOrderRequest = (object) => {
        let requestBody = MobileRequestBody.buildIncomingStockInByOrder(object.incomingOrderId, object.materialLots);
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl)
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
     * 成品入库
     * @param {*} object 
     */
    static sendStockInFinishGoodRequest = (object) => {
        const {materialLotId, storageId} = object;
        let requestBody = MobileRequestBody.buildStockInFinishGood(materialLotId, storageId);
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendStockOutRequest = (object) => {
        const {materialLotId, storageId} = object;
        let requestBody = MobileRequestBody.buildStockOut(materialLotId, storageId)
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendStockOutByOrderRequest = (object) => {
        let requestBody = MobileRequestBody.buildStockOutByOrder(object.documentId, object.materialLots)
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendQueryWaitPackageMLotRequest = (object) => {
        const {materialLotId} = object;
        let requestBody = MobileRequestBody.buildQueryWaitPackageMLot(materialLotId)
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendPackageMLotRequest = (object) => {
        const {materialLots, packageType} = object;
        let requestBody = MobileRequestBody.buildPackageMLot(materialLots, packageType)
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendQueryShipMLotByDocIdRequest = (object) => {
        const {documentId} = object;
        let requestBody = MobileRequestBody.buildQueryShipMLotByDocId(documentId)
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendShipMLotRequest = (object) => {
        const {documentId, materialLotId} = object;
        let requestBody = MobileRequestBody.buildShipMLot(documentId, materialLotId)
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendCheckMLotInventoryRequest = (object) => {
        const {transQty, materialLotId, warehouseId, storageId} = object;
        let requestBody = MobileRequestBody.buildCheckMLotInventory(transQty, materialLotId, warehouseId, storageId)
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendPrintMLotsRequest = (object) => {
        let requestBody = MobileRequestBody.buildPrintMLots(object.materialLots);
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
     * 转库
     * @param {} object 
     */
    static sendTransferInvRequest = (object) => {
        let requestBody = MobileRequestBody.buildTransferInv(object.materialLotId, object.fromStorageId, object.targetStorageId);
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendVailadateTargetWarehouse = (object) => {
        let requestBody = MobileRequestBody.buildVailadateTargetWarehouse(object.materialLotId, object.targetStorageId);
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static vailadateFromWarehouse = (object) => {
        let requestBody = MobileRequestBody.buildVailadateFromWarehouse(object.materialLotId, object.fromStorageId);
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    //批量转库
    static sendTransferInvMLotsRequest = (object) => {
        let requestBody = MobileRequestBody.buildTransferInvMLots(object.data);
        let requestHeader = new MobileRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCMobileManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}