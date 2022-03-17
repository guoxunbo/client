import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';
import ReturnLotOrderRequestBody from './ReturnLotOrderRequestBody';
import ReturnLotOrderRequestHeader from './ReturnLotOrderRequestHeader';

export default class ReturnLotOrderRequest {

    static sendGetReturnLotInfoRequest = (object) => {
        let requestBody =  ReturnLotOrderRequestBody.buildGetReturnLotInfo(object.documentId);
        let requestHeader = new ReturnLotOrderRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSReturnMLotByDocUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 退料 产线退到仓库
     * @param {*} object
     */
    static sendReturnLotRequest = (object) => {
        let requestBody = ReturnLotOrderRequestBody.buildReturnLot(object.documentId, object.materialLots);
        let requestHeader = new ReturnLotOrderRequestHeader();
        let request = new Request(requestHeader,requestBody, UrlConstant.VCReturnMLotByDocUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 创建退料单 仓库退到供应商
     * @param {*} object
     */
    static sendCreateReturnOrder = (object) => {
        let requestBody = ReturnLotOrderRequestBody.buildCreateReturnOrder(object.materialLots);
        let requestHeader = new ReturnLotOrderRequestHeader();
        let request = new Request(requestHeader,requestBody, UrlConstant.MMSCreateReturnMLotOrderUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 退料 仓库退到供应商
     * @param {*} object
     */
    static sendReturnMLotByOrderRequest = (object) => {
        let requestBody = ReturnLotOrderRequestBody.buildReturnMLotByOrder(object.documentId, object.materialLots);
        let requestHeader = new ReturnLotOrderRequestHeader();
        let request = new Request(requestHeader,requestBody, UrlConstant.MMSReturnMLotByDocUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

     /**
     * 创建退货单
     * 客户退回
     * @param {*} object
     */
      static sendCreateReturnGoodsRequest = (object) => {
        let requestBody = ReturnLotOrderRequestBody.buildCreateReturnGoods(object.dataList);
        let requestHeader = new ReturnLotOrderRequestHeader();
        let request = new Request(requestHeader,requestBody, UrlConstant.MMSCreateReturnMLotOrderUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 退货
     * 客户退回
     * @param {*} object
     */
    static sendReturnGoodsRequest = (object) => {
        let requestBody = ReturnLotOrderRequestBody.buildReturnGoods(object.documentId, object.materialLots);
        let requestHeader = new ReturnLotOrderRequestHeader();
        let request = new Request(requestHeader,requestBody, UrlConstant.MMSReturnMLotByDocUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }
}
