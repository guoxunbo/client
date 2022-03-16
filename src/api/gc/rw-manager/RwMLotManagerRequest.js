import RwMLotManagerRequestHeader from './RwMLotManagerRequestHeader';
import RwMLotManagerRequestBody from './RwMLotManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class RwMLotManagerRequest {

    static sendPrintLableRequest = (object) => {
        let {materialLotList, printCount} = object;
        let requestBody = RwMLotManagerRequestBody.buildGetPrintParam(materialLotList, printCount);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendRwFinishReceiveRequest = (object) => {
        let requestBody = RwMLotManagerRequestBody.buildRwReceivePackedLot(object.mesPackedLots, object.printLabel, object.printCount);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendPrintRwReceiveLotLableRequest = (object) => {
        let {materialLot, printCount} = object;
        let requestBody = RwMLotManagerRequestBody.buildGetRwLotPrintParam(materialLot, printCount);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendAutoPickTagMLotRequest = (object) => {
        let {materialLotList, pickQty} = object;
        let requestBody = RwMLotManagerRequestBody.buildAutoPickTagMLot(materialLotList, pickQty);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendCOBWaferStockTagQueryRequest = (object) => {
        let {tableRrn, whereClause} = object;
        let requestBody = RwMLotManagerRequestBody.buildQueryCobWaferMLotUnit(tableRrn, whereClause);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendAutoPickTagMLotUnitRequest = (object) => {
        let {materialLotUnitList, pickQty} = object;
        let requestBody = RwMLotManagerRequestBody.buildAutoPickTagMLotUnit(materialLotUnitList, pickQty);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendCOBStockOutTagRequest = (object) => {
        let {materialLotUnitList, abbreviation, customerName, remarks} = object;
        let requestBody = RwMLotManagerRequestBody.buildCOBMLotUnitStockTagging(materialLotUnitList, abbreviation, customerName, remarks);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendRwStockOutTagRequest = (object) => {
        let {materialLotList, abbreviation, customerName, remarks} = object;
        let requestBody = RwMLotManagerRequestBody.buildRwMLotStockTagging(materialLotList, abbreviation, customerName, remarks);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendUnStockOutTagRequest = (object) => {
        let {materialLotList} = object;
        let requestBody = RwMLotManagerRequestBody.buildRwMLotUnStockTagging(materialLotList);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendAddShipOrderIdRequest = (object) => {
        let {materialLotList, shipOrderId} = object;
        let requestBody = RwMLotManagerRequestBody.buildMLotAddShipOrderId(materialLotList, shipOrderId);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendCancelShipOrderIdRequest = (object) => {
        let {materialLotList} = object;
        let requestBody = RwMLotManagerRequestBody.buildMLotCancelShipOrderId(materialLotList);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendPreViewMLotRequest = (object) => {
        let {materialLotList} = object;
        let requestBody = RwMLotManagerRequestBody.buildMLotPreViewMLot(materialLotList);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetMaterialLotByRrnRequest = (object) => {
        let {tableRrn, queryLotId} = object;
        let requestBody = RwMLotManagerRequestBody.buildRwStockOutMLotByTableRrnAndLotId(tableRrn, queryLotId);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendRwStockOutRequest = (object) => {
        let {materialLotList, documentLineList} = object;
        let requestBody = RwMLotManagerRequestBody.buildRwStockOut(materialLotList, documentLineList);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendRWPrintParameterRequest = (object) => {
        let requestBody = RwMLotManagerRequestBody.buildRWBoxPrintParameter(object.materialLotRrn, object.printCount);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendRWStockOutPrintRequest = (object) => {
        let requestBody = RwMLotManagerRequestBody.buildRWStockOutPrintParameter(object.materialLotRrn);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendRWBoxLabelPrintRequest = (object) => {
        let requestBody = RwMLotManagerRequestBody.buildRWBoxLabelPrintParameter(object.materialLotRrn);
        let requestHeader = new RwMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRwMaterialLotManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}

