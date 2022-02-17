import RelayBoxStockInManagerRequestBody from "./RelayBoxStockInManagerRequestBody"
import RelayBoxStockInManagerRequestHeader from "./RelayBoxStockInManagerRequestHeader";
import Request from "../../Request";
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';

export default class RelayBoxStockInManagerRequest {

    static sendQueryBoxRequest = (object) => {
        let reqreuestBody = RelayBoxStockInManagerRequestBody.buildQueryBox(object.materialLotId, object.tableRrn);
        let requestHeader = new RelayBoxStockInManagerRequestHeader();
        let request = new Request(requestHeader, reqreuestBody, UrlConstant.GCRelayBoxStockInUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendQueryRelayBoxRequest = (object) => {
        let reqreuestBody = RelayBoxStockInManagerRequestBody.buildQueryRelayBox(object.relayBoxId);
        let requestHeader = new RelayBoxStockInManagerRequestHeader();
        let request = new Request(requestHeader, reqreuestBody, UrlConstant.GCRelayBoxStockInUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendRelayBoxChangeStorageRequest = (object) => {
        let reqreuestBody = RelayBoxStockInManagerRequestBody.buildRelayBoxChangeStorage(object.materialLots);
        let requestHeader = new RelayBoxStockInManagerRequestHeader();
        let request = new Request(requestHeader, reqreuestBody, UrlConstant.GCRelayBoxStockInUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

}