import ProductRelationRequestHeader from './ProductRelationRequestHeader';
import ProductRelationRequestBody from './ProductRelationRequestBody';
import {UrlConstant, DefaultRowKey} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class ProductRelationRequest {

    /**
     * 发送merge信息请求
     */
    static sendMergeRequest = (object) => {
        let requestBody = ProductRelationRequestBody.buildMergeProductNumberRelation(object.productNumberRelation);
        let requestHeader = new ProductRelationRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCProductRelationUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}