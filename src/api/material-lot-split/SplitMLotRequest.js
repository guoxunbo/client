import Request from "@api/Request";
import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import SplitMLotRequestBody from "./SplitMLotRequestBody";
import SplitMLotRequestHeader from "./SplitMLotRequestHeader";


export default class SplitMLotRequest{

    static sendSplitMLotRequest = (object) =>{
        let requestBody =  SplitMLotRequestBody.buildSplitMLot(object.spiltAction);
        let requestHeader = new SplitMLotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSSplitMaterialLotUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject); 
    }

}