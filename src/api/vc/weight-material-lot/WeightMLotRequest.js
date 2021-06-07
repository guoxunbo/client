import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import WeightMLotRequestBody from "./WeightMLotRequestBody";
import WeightMLotRequestHeader from "./WeightMLotRequestHeader";
import Request from '@api/Request';

export default class WeightMLotRequest {

    static sendWeightMaterialLot = (object)=>{
        let requestBody = WeightMLotRequestBody.buildWeightMaterialLot(object.materialLotId, object.grossWeight, object.cartonSize);
        let requestHeader = new WeightMLotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCWeightMaterialLotUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}
