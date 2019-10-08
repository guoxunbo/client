import ValidationSoOrTestRequestHeader from './ValidationSoOrTestRequestHeader';
import ValidationSoOrTestRequestBody from './ValidationSoOrTestRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class ValidationSoOrTestRequest {

    static sendValidationRequest = (object) => {
        let {documentLine, materialLot} = object;
        let requestBody = ValidationSoOrTestRequestBody.buildValidation(documentLine, materialLot);
        let requestHeader = new ValidationSoOrTestRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCValidationSoOrReTestUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

}

