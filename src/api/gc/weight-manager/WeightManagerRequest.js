import WeightManagerRequestBody from "./WeightManagerRequestBody"
import WeightManagerRequestHeader from "./WeightManagerRequestHeader";
import Request from "../../Request";
import { UrlConstant } from "../../const/ConstDefine";
import MessageUtils from "../../utils/MessageUtils";


export default class WeightManagerRequest {

    static sendQueryRequest = (object) => {
        let requestBody = WeightManagerRequestBody.buildQuery(object.materialLotId, object.tableRrn);
        let requestHeader = new WeightManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWightUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendWeightRequest = (object) => {
        let requestBody = WeightManagerRequestBody.buildWeight(object.materialLots);
        let requestHeader = new WeightManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCWightUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }
}