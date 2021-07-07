import MaterialLotManagerRequestHeader from './MaterialLotManagerRequestHeader';
import MaterialLotManagerRequestBody from './MaterialLotManagerRequestBody';
import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';

export default class MaterialLotManagerRequest {

    static sendGetJudgePackCaseItemListRequest = (object) => {
        let requestBody = MaterialLotManagerRequestBody.buildGetJudgePackCaseItemList();
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendJudgePackedMaterialLotRequest = (object) => {
        const {packedLotDetails, checkList} = object;
        let requestBody = MaterialLotManagerRequestBody.buildJudgePackedMaterialLots(packedLotDetails, checkList);
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

}
