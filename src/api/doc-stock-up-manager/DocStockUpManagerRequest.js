import {UrlConstant, DefaultRowKey} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';
import DocStockUpManagerRequestBody from './DocStockUpManagerRequestBody';
import DocStockUpManagerRequestHeader from './DocStockUpManagerRequestHeader';

export default class DocStockUpManagerRequest {

    /**
     * 查询物料批次by子单
     * @param {*} object 
     */
    static sendGetMaterialLotListRequest = (object) => {
        let requestBody = DocStockUpManagerRequestBody.buildGetMaterialLotList(object.docLineId);
        let requestHeader = new DocStockUpManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCStockUpManager);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail

        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
     * 备货
     * @param {*} object 
     */
     static sendStockUpRequest = (object) => {
        let requestBody = DocStockUpManagerRequestBody.buildStockUp(object.docLineId, object.materialLots);
        let requestHeader = new DocStockUpManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCStockUpManager);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

}