import RecordExpressNumberRequestHeader from './RecordExpressNumberRequestHeader';
import RecordExpressNumberRequestBody from './RecordExpressNumberRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class RecordExpressNumberRequest {

    static sendRecordExpress = (object) => {
        let requestBody = RecordExpressNumberRequestBody.buildRecordExpressNumber(object.datas);
        let requestHeader = new RecordExpressNumberRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRecordExpressUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
}