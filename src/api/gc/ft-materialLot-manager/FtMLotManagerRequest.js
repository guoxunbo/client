import FtMLotManagerRequestHeader from './FtMLotManagerRequestHeader';
import FtMLotManagerRequestBody from './FtMLotManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class FtMLotManagerRequest {

    static sendReceiveUnitRequest = (object) => {
        let {materialLotUnitList} = object;
        let requestBody = FtMLotManagerRequestBody.buildReceive(materialLotUnitList);
        let requestHeader = new FtMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCftMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}

