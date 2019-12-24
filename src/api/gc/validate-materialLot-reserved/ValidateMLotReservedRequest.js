import ValidationMLotReservedRequestHeader from "./ValidationMLotReservedRequestHeader";
import ValidationMLotReservedRequestBody from "./ValidationMLotReservedRequestBody";
import { UrlConstant } from "../../const/ConstDefine";
import MessageUtils from "../../utils/MessageUtils";
import Request from '../../Request';

export default class ValidateMLotReservedRequest{

    static sendValidationRequest = (object) => {
        let {materialLotFirst, materialLot} = object;
        let requestBody = ValidationMLotReservedRequestBody.buildValidation(materialLot);
        let requestHeader = new ValidationMLotReservedRequestHeader();
        let request = new Request(requestHeader,requestBody,UrlConstant.GCValidationMLotReservedUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        MessageUtils.sendRequest(requestObject);
    }

}