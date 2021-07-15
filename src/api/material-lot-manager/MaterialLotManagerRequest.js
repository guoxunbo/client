import MaterialLotManagerRequestHeader from './MaterialLotManagerRequestHeader';
import MaterialLotManagerRequestBody, { ActionType } from './MaterialLotManagerRequestBody';
import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';

export default class MaterialLotManagerRequest {

    static sendReceiveMaterialLotRequest = (object) => {
        let formObject = object.formObject;
        let requestBody = MaterialLotManagerRequestBody.buildReceiveMaterialLot(formObject);
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendPrintMaterialLotRequest = (object) => {
        let requestBody = MaterialLotManagerRequestBody.buildPrintMLot(object.materialLot);
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendMaterialLotActionRequest = (object) => {
        let requestBody = MaterialLotManagerRequestBody.buildHandleMaterialLot(object);
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 备品备件 接收入库
     */
     static sendReceiveSpareMaterialLotRequest = (object) => {
        let requestBody = MaterialLotManagerRequestBody.buildReceiveSpareMaterialLot(object.formObject);
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }
}
