import Request from "@api/Request";
import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import MaterialLotHoldRequestBody from "./MaterialLotHoldRequestBody";
import MaterialLotHoldRequestHeader from "./MaterialLotHoldRequestHeader";


export default class MaterialLotHoldRequest{

    static sendHoldMLot = (object) =>{
        let requestBody =  MaterialLotHoldRequestBody.buildHoldMaterialLot(object.waitHoldMLotAndAction);
        let requestHeader = new MaterialLotHoldRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSHoldMateraiLotUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }
}
