import RawMaterialManagerRequestHeader from './RawMaterialManagerRequestHeader';
import RawMaterialManagerRequestBody from './RawMaterialManagerRequestBody';
import {UrlConstant, DefaultRowKey} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';

export default class RawMaterialManagerRequest {

    /**
     * Merge
     */
     static sendMergeRequest = (object) => {
        let requestBody = RawMaterialManagerRequestBody.buildMergeRawMaterial(object.rawMaterial);
        let requestHeader = new RawMaterialManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCRawMaterialManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}