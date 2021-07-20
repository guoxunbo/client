import MaterialLotManagerRequestHeader from './MaterialLotManagerRequestHeader';
import MaterialLotManagerRequestBody from './MaterialLotManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class MaterialLotManagerRequest {

    static sendQueryMaterialLotIdOrLotIdRequest = (object) => {
        let requestBody = MaterialLotManagerRequestBody.buildQueryMaterialLotIdOrLotId(object.tableRrn, object.queryLotId);
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetCancelCheckRequest = (object) => {
        let requestBody = MaterialLotManagerRequestBody.buildCancelCheck(object.materialLotList, object.cancelReason);
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetJudgePackCaseItemListRequest = (object) => {
        let requestBody = MaterialLotManagerRequestBody.buildGetJudgePackCaseItemList();
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetWltJudgePackCaseItemListRequest = (object) => {
        let requestBody = MaterialLotManagerRequestBody.buildGetWltJudgePackCaseItemList();
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendJudgePackedMaterialLotRequest = (object) => {
        const {packedLotDetails, checkList} = object;
        let requestBody = MaterialLotManagerRequestBody.buildJudgePackedMaterialLots(packedLotDetails, checkList);
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendBindRelaxBoxRequest = (object) => {
        let requestBody = MaterialLotManagerRequestBody.buildBindRelayBox(object.materialLots, object.relayBoxId);
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
    static sendUnBindRelaxBoxRequest = (object) => {
        let requestBody = MaterialLotManagerRequestBody.buildUnbindRelayBox(object.materialLots);
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendQueryMLotRequest = (object) => {
        let requestBody = MaterialLotManagerRequestBody.buildQueryMLot(object.tableRrn, object.queryLotId);
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}