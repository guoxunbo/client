import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';
import SyncIncomingOrReturnMLotRequestHeader from './SyncIncomingOrReturnMLotRequestHeader';
import SyncIncomingOrReturnMLotRequestBody from './SyncIncomingOrReturnMLotRequestBody';

export default class SyncIncomingOrReturnMLotRequest {
   
    /**
     * 同步 来料/退料
     * @param {*} object 
     */
    static sendSyncIncomingOrReturnRequest = (object) => {
        let requestBody = SyncIncomingOrReturnMLotRequestBody.buildSyncIncomingOrReturn(object.actionType);
        let requestHeader = new SyncIncomingOrReturnMLotRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCSyncERPMaterialLot);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}