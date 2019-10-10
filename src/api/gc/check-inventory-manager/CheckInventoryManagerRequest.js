import CheckInventoryManagerRequestHeader from './CheckInventoryManagerRequestHeader';
import CheckInventoryManagerRequestBody from './CheckInventoryManagerRequestBody';
import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';

export default class CheckInventoryManagerRequest {

    static sendCheckInventory = (object) => {
        let requestBody = CheckInventoryManagerRequestBody.checkInventory(object);
        let requestHeader = new CheckInventoryManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCCheckInventoryUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}

