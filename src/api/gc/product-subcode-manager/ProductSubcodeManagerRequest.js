import ProductSubcodeManagerRequestHeader from './ProductSubcodeManagerRequestHeader';
import ProductSubcodeManagerRequestBody from './ProductSubcodeManagerRequestBody';
import {UrlConstant, DefaultRowKey} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class ProductSubcodeManagerRequest {

    /**
     * 发送merge信息请求
     */
    static sendMergeRequest = (object) => {
        if (object.productSubcode.newFlag) {
            object.productSubcode[DefaultRowKey] = undefined;
        }
        let requestBody = ProductSubcodeManagerRequestBody.buildMergeProductSubcode(object.productSubcode);
        let requestHeader = new ProductSubcodeManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCProductSubcodeManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}