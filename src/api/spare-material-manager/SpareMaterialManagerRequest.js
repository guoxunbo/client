import SpareMaterialManagerRequestHeader from './SpareMaterialManagerRequestHeader';
import SpareMaterialManagerRequestBody from './SpareMaterialManagerRequestBody';
import {UrlConstant, DefaultRowKey} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';

export default class SpareMaterialManagerRequest {

    /**
     * Merge
     */
    static sendMergeRequest = (object) => {
        let requestBody = SpareMaterialManagerRequestBody.buildMergeMaterial(object.spareMaterial);
        let requestHeader = new SpareMaterialManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCPartsMaterialManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 导入
     * @param {*} object
     */
    static sendImportMaterialRequest = (object) => {
        let requestBody = SpareMaterialManagerRequestBody.buildImportMaterial(object.dataList);
        let requestHeader = new SpareMaterialManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCPartsMaterialManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    // /**
    //  * 接收
    //  */
    // static sendReceiveSpareMaterialLotRequest = (object) => {
    //     let requestBody = SpareMaterialManagerRequestBody.buildReceiveSpareMaterialLot(object.action);
    //     let requestHeader = new SpareMaterialManagerRequestHeader();
    //     let request = new Request(requestHeader, requestBody, UrlConstant.VCPartsMaterialManagerUrl);
    //     let requestObject = {
    //         request: request,
    //         success: object.success
    //     }
    //     const {sendRequest} = MessageUtils();
    //     sendRequest(requestObject);
    // }
}
