import {UrlConstant, DefaultRowKey} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';
import DocQueryManagerRequestBody from './DocQueryManagerRequestBody';
import DocQueryManagerRequestHeader from './DocQueryManagerRequestHeader';

export default class DocQueryManagerRequest {

    /**
     * 查询物料批次by单据
     * @param {*} object 
     */
    static sendQueryMLotByOrderRequest = (object) => {
        let requestBody = DocQueryManagerRequestBody.buildQueryMLotByOrder(object.documentId);
        let requestHeader = new DocQueryManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCQueryOrderManagerUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail

        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 查询单据以及批次by批次号
     * @param {*} object 
     */
     static sendQueryOrderByMLotIdRequest = (object) => {
        let requestBody = DocQueryManagerRequestBody.buildQueryOrderByMLotId(object.materialLotId, object.documentCategory);
        let requestHeader = new DocQueryManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCQueryOrderManagerUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 查询物料批次by单据
     * @param {*} object 
     */
     static sendDeleteDocumentRequest = (object) => {
        let requestBody = DocQueryManagerRequestBody.buildDeleteDocument(object.documentId);
        let requestHeader = new DocQueryManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCQueryOrderManagerUrl);
        let requestObject = {
            request: request,
            success: object.success,
            fail: object.fail

        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

}
