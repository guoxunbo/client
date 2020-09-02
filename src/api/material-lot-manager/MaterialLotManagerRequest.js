import MaterialLotManagerRequestHeader from './MaterialLotManagerRequestHeader';
import MaterialLotManagerRequestBody, { ActionType } from './MaterialLotManagerRequestBody';
import {UrlConstant} from '../const/ConstDefine';
import MessageUtils from '../utils/MessageUtils';
import Request from '../Request';
import { object } from 'prop-types';

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
        MessageUtils.sendRequest(requestObject);
    }

    static sendMaterialLotActionRequest = (object) => {
        let requestBody = MaterialLotManagerRequestBody.buildHandleMaterialLot(object);
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendReceivePartsRequest = (object) => {
        let formObject = object.formObject;
        let requestBody = MaterialLotManagerRequestBody.buildReceiveParts(formObject);
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    } 

}