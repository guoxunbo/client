import ValidationMaterialRequestHeader from "./ValidationMaterialRequestHeader";
import ValidationMaterialRequestBody from "./ValidationMaterialRequestBody";
import { UrlConstant } from "../../const/ConstDefine";
import MessageUtils from "../../utils/MessageUtils";
import Request from '../../Request';

export default class ValidationMaterialRequest{

    static sendValidationRequest = (object) => {
        let {materialLotFirst, materialLot} = object;
        let requestBody = ValidationMaterialRequestBody.buildValidation(materialLotFirst, materialLot);
        let requestHeader = new ValidationMaterialRequestHeader();
        let request = new Request(requestHeader,requestBody,UrlConstant.GCValidationMaterialUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

}