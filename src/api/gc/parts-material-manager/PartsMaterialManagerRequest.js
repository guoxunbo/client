import {UrlConstant, DefaultRowKey} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import PartsMaterialManagerRequestBody from './PartsMaterialManagerRequestBody';
import PartsMaterialManagerRequestHeader from './PartsMaterialManagerRequestHeader';
import Request from '../../Request';

export default class PartsMaterialManagerRequest {

    static sendMergePartsRequest = (object) => {
        if (object.parts.newFlag) {
            object.parts[DefaultRowKey] = undefined;
        }
        let requestBody = PartsMaterialManagerRequestBody.buildMergePartsMaterial(object.parts);
        let requestHeader = new PartsMaterialManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.PartsMaterialManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
}