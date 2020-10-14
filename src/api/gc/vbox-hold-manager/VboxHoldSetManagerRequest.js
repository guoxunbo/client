import VboxHoldSetManagerRequestHeader from './VboxHoldSetManagerRequestHeader';
import VboxHoldSetManagerRequestBody from './VboxHoldSetManagerRequestBody';
import {UrlConstant, DefaultRowKey} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class VboxHoldSetManagerRequest {

    /**
     * 发送merge信息请求
     */
    static sendMergeRequest = (object) => {
        let requestBody = VboxHoldSetManagerRequestBody.buildMergeVboxHoldSet(object.workorderRelation);
        let requestHeader = new VboxHoldSetManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCVboxHoldSetManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}