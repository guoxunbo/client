import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import ScrapMLotRequestBody from "./ScrapMLotRequestBody";
import ScrapMLotRequestHeader from "./ScrapMLotRequestHeader";
import Request from '@api/Request';

export default class ScrapMLotRequest {

    /**
    * 报废
    * @param {*} object 
    */
    static sendScrapMLotByOrderRequest = (object) => {
        let requestBody = ScrapMLotRequestBody.buildScrapMLotByOrder(object.docId, object.materialLots);
        let requestHeader = new ScrapMLotRequestHeader();
        let request = new Request(requestHeader,requestBody, UrlConstant.VCScrapMLotManager);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
     * 根据单据匹配规则 获得物料批次信息
     * @param {} object 
     */
    static sendGetReservedMLotRequest = (object) => {
        let requestBody = ScrapMLotRequestBody.buildGetReservedMLot(object.docLineId);
        let requestHeader = new ScrapMLotRequestHeader();
        let request = new Request(requestHeader,requestBody, UrlConstant.VCScrapMLotManager);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
    * 验证物料批次 匹配单据
    * @param {*} object 
    */
    static sendValidateReservedMLotRequest = (object) => {
       let requestBody = ScrapMLotRequestBody.buildValidateReservedMLot(object.documentLineId, object.materialLotId);
       let requestHeader = new ScrapMLotRequestHeader();
       let request = new Request(requestHeader,requestBody, UrlConstant.VCScrapMLotManager);
       let requestObject = {
           request: request,
           success: object.success,
           fail: object.fail,
       }
       MessageUtils.sendRequest(requestObject);
    }

}
