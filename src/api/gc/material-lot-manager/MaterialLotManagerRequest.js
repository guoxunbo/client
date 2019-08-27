import MaterialLotManagerRequestHeader from './MaterialLotManagerRequestHeader';
import MaterialLotManagerRequestBody from './MaterialLotManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class MaterialLotManagerRequest {

    static sendJudgePackedMaterialLotRequest = (object) => {
        const {packedLotDetails, judgeGrade, judgeCode} = object;
        let requestBody = MaterialLotManagerRequestBody.buildJudgePackedMaterialLots(packedLotDetails, judgeGrade, judgeCode);
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendBindRelaxBoxRequest = (object) => {
        let requestBody = MaterialLotManagerRequestBody.buildBindRelayBox(object.materialLots, object.relayBoxId);
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
    static sendUnBindRelaxBoxRequest = (object) => {
        let requestBody = MaterialLotManagerRequestBody.buildUnbindRelayBox(object.materialLots);
        let requestHeader = new MaterialLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}