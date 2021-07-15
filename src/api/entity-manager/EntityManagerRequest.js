/**
 * 请求EntityManager操作相关的消息请求类
 */
import EntityManagerRequestHeader from './EntityManagerRequestHeader';
import EntityManagerRequestBody from './EntityManagerRequestBody';
import {UrlConstant, DefaultRowKey} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import * as PropTypes from 'prop-types';
import Request from '@api/Request';

export default class EntityManagerRequest {

    modelClass;
    values;

    static sendMergeRequest = (object) => {
        // 如果数据是新增的，清空objectRrn栏位
        if (object.values.newFlag) {
            object.values[DefaultRowKey] = undefined;
        }
        let requestBody = EntityManagerRequestBody.buildMergeEntity(object.modelClass, object.values, object.tableRrn);
        let requestHeader = new EntityManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.EntityManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendUploadFileRequest = (object, file) => {
        let requestBody = EntityManagerRequestBody.buildUploadEntityFile(object.modelClass, object.values, object.filePropertyName);
        let requestHeader = new EntityManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.EntityUploadFileUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendImportData} = MessageUtils();
        sendImportData(requestObject, file);
    }

    static sendDownloadFileRequest = (object) => {
        let requestBody = EntityManagerRequestBody.buildDownloadEntityFile(object.modelClass, object.values, object.filePropertyName);
        let requestHeader = new EntityManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.EntityDownloadFileUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendExpRequest} = MessageUtils();
        sendExpRequest(requestObject, object.fileName);
    }

    static sendDeleteRequest = (object) => {
        let requestBody = EntityManagerRequestBody.buildDeleteEntity(object.modelClass, object.values, object.deleteRelationEntityFlag);
        let requestHeader = new EntityManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.EntityManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendStatusChangedRequest = (object) => {
        let requestBody = EntityManagerRequestBody.buildStatusChangeEntity(object.modelClass, object.values, object.actionType);
        let requestHeader = new EntityManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.EntityManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

}
EntityManagerRequest.prototypes = {
    modelClass: PropTypes.string.isRequired,
    values: PropTypes.object,
}
