import RecordExpressNumberRequestHeader from './RecordExpressNumberRequestHeader';
import RecordExpressNumberRequestBody from './RecordExpressNumberRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';
import { object } from 'prop-types';

export default class RecordExpressNumberRequest {

    static sendOldRecordExpress = (object) => {
        let requestBody = RecordExpressNumberRequestBody.buildOldRecordExpress(object.datas);
        let requestHeader = new RecordExpressNumberRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRecordExpressUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendAutoRecordExpress = (object) => {
        let requestBody = RecordExpressNumberRequestBody.buildAutoRecordExpress(object.datas, object.serviceMode, object.payMode);
        let requestHeader = new RecordExpressNumberRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRecordExpressUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendManualRecordExpress = (object) => {
        let requestBody = RecordExpressNumberRequestBody.buildManualRecordExpress(object.expressNumber, object.datas);
        let requestHeader = new RecordExpressNumberRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRecordExpressUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
    static sendCancelRecordExpress = (object) => {
        let requestBody = RecordExpressNumberRequestBody.buildCancelRecordExpress(object.datas);
        let requestHeader = new RecordExpressNumberRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRecordExpressUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
    static sendQueryPrintParameterRequest = (object) => {
        let requestBody = RecordExpressNumberRequestBody.buildPrintObliqueLabel(object.datas, object.expressNumber);
        let requestHeader = new RecordExpressNumberRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRecordExpressUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendObliqueLabelPrintRequest = (object) => {
        let requestBody = RecordExpressNumberRequestBody.buildObliqueLabelPrint(object.datas);
        let requestHeader = new RecordExpressNumberRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRecordExpressUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}