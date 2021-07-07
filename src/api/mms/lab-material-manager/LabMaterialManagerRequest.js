import {UrlConstant, DefaultRowKey} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';
import LawMaterialManagerRequestBody from './LabMaterialManagerRequestBody';
import LawMaterialManagerRequestHeader from './LabMaterialManagerRequestHeader';

export default class LabMaterialManagerRequest {

    static sendMergeRequest = (object) => {
        let requestBody = LawMaterialManagerRequestBody.buildMergeLawMaterial(object.LabMaterial);
        let requestHeader = new LawMaterialManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCLabMaterialManagertUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendImportRequest = (object, file) => {
        let requestBody = LawMaterialManagerRequestBody.buildImportLawMaterial(object.tableRrn);
        let requestHeader = new LawMaterialManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCLabMaterialImportUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendImportData} = MessageUtils();
        sendImportData(requestObject, file);
    }
}
