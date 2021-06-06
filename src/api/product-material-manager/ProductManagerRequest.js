import ProductManagerRequestHeader from './ProductManagerRequestHeader';
import ProductManagerRequestBody from './ProductManagerRequestBody';
import {UrlConstant, DefaultRowKey} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';

export default class ProductManagerRequest {

    /**
     * 发送merge信息请求
     */
     static sendMergeRequest = (object) => {
        let requestBody = ProductManagerRequestBody.buildMergeProduct(object.product);
        let requestHeader = new ProductManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCProductManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}