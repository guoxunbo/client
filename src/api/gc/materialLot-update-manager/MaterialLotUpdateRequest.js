import MaterialLotUpdateRequestHeader from './MaterialLotUpdateRequestHeader';
import MaterialLotUpdateRequestBody from './MaterialLotUpdateRequestBody';
import Request from '../../Request';
import MessageUtils from '../../utils/MessageUtils';
import { UrlConstant } from "../../const/ConstDefine";

export default class MaterialLotUpdateRequest {
    
    static sendUpdateRequest = (object) => {
        let requestBody = MaterialLotUpdateRequestBody.buildUpdateInfo(object.treasuryeNote, object.materialLotList);
        let requestHeader = new MaterialLotUpdateRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCUpdateMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendUpdateLocationRequest = (object) => {
        let requestBody = MaterialLotUpdateRequestBody.buildUpdateLocationInfo(object.location, object.materialLotList, object.remarks);
        let requestHeader = new MaterialLotUpdateRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCUpdateMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendQueryRequest = (object) => {
        let requestBody = MaterialLotUpdateRequestBody.buildQuery(object.materialLotId);
        let requestHeader = new MaterialLotUpdateRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCUpdateMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendHoldMaterialLotRequest = (object) => {
        let requestBody = MaterialLotUpdateRequestBody.buildHoldInfo(object.materialLotList, object.reason, object.remarks);
        let requestHeader = new MaterialLotUpdateRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCUpdateMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendReleaseMaterialLotRequest = (object) => {
        let requestBody = MaterialLotUpdateRequestBody.buildReleaseInfo(object.materialLotList, object.reason, object.remarks);
        let requestHeader = new MaterialLotUpdateRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCUpdateMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetReferenceListRequest = (object) => {
        let requestBody = MaterialLotUpdateRequestBody.buildGetReferenceList(object.referenceName);
        let requestHeader = new MaterialLotUpdateRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCUpdateMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendUpdateLotInfoRequest = (object) => {
        let requestBody = MaterialLotUpdateRequestBody.buildUpdateMLotInfo(object.materialLot);
        let requestHeader = new MaterialLotUpdateRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCUpdateMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    } 

    static sendImportSearchRequest = (object, file) => {
        let requestBody = MaterialLotUpdateRequestBody.buildImportSearch(object.tableRrn);
        let requestHeader = new MaterialLotUpdateRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCMLotImportSearchManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendImportData(requestObject, file);
    }
}