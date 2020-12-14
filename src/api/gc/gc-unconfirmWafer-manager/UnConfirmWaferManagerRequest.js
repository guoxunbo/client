import UnConfirmWaferManagerRequestHeader from './UnConfirmWaferManagerRequestHeader';
import UnConfirmWaferManagerRequestBody from './UnConfirmWaferManagerRequestBody';
import { UrlConstant } from "../../const/ConstDefine";
import Request from '../../Request';
import MessageUtils from '../../utils/MessageUtils';

export default class UnConfirmWaferManagerRequest {

    static sendMergeRequest = (object) => {
        let requestBody = UnConfirmWaferManagerRequestBody.buildMergeUnConfirmWaferSet(object.waferSet);
        let requestHeader = new UnConfirmWaferManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCUnConfirmWaferTrackSetUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}