import ErpDocLineMergeManagerRequestHeader from './ErpDocLineMergeManagerRequestHeader';
import ErpDocLineMergeManagerRequestBody from './ErpDocLineMergeManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class ErpDocLineMergeManagerRequest {

    static sendMergeDocRequest = (object) => {
        let requestBody = ErpDocLineMergeManagerRequestBody.buildMergeDocLine(object.documentLines);
        let requestHeader = new ErpDocLineMergeManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCErpDocLineMergeManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendHNWarehouseMergeDocRequest = (object) => {
        let requestBody = ErpDocLineMergeManagerRequestBody.buildHNWarehouseMergeDocLine(object.documentLines);
        let requestHeader = new ErpDocLineMergeManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCErpDocLineMergeManageUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}