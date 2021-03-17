import Request from "@api/Request";
import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import MaterialLotSplitRequestBody from "./MaterialLotSplitRequestBody";
import MaterialLotSplitRequestHeader from "./MaterialLotSplitRequestHeader";

export default class MaterialLotSplitRequest {

    static sendSplitMaterialLot = (object) => {
        let requestBody =  MaterialLotSplitRequestBody.buildSplitMaterialLot(object.waitSplitMLotAndAction);
        let requestHeader = new MaterialLotSplitRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSSplitMateraiLotUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}