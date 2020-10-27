import FtMLotManagerRequestHeader from './FtMLotManagerRequestHeader';
import FtMLotManagerRequestBody from './FtMLotManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class FtMLotManagerRequest {

    static sendReceiveUnitRequest = (object) => {
        let {materialLotUnitList} = object;
        let requestBody = FtMLotManagerRequestBody.buildReceive(materialLotUnitList);
        let requestHeader = new FtMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCftMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendQueryRequest = (object) => {
        let requestBody = FtMLotManagerRequestBody.buildQueryStockInMLot(object.unitId, object.tableRrn);
        let requestHeader = new FtMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCftMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendFTStockInRequest = (object) => {
        let requestBody = FtMLotManagerRequestBody.buildStockInFTMLot(object.materialLotUnitList);
        let requestHeader = new FtMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCftMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetIssueUnitByTableRrnRequest = (object) => {
        let requestBody = FtMLotManagerRequestBody.buildQueryWaitIssueUnit(object.tableRrn);
        let requestHeader = new FtMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCftMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendUnitIssueRequest = (object) => {
        let requestBody = FtMLotManagerRequestBody.buildUnitIssue(object.documentLines, object.materialLotUnitList);
        let requestHeader = new FtMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCftMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}

