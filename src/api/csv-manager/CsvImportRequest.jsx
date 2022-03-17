import {UrlConstant} from '@const/ConstDefine';
import MessageUtils from '@utils/MessageUtils';
import Request from '@api/Request';
import CsvImportRequestBody from './CsvImportRequestBody';
import CsvImportRequestBodyHeader from './CsvImportRequestHeader';

export default class CsvImportRequest {

    /**
     * 导入数据
     * @param {*} object
     * @param {*} file
     */
    static sendImportRequest = (object, file) => {
        let requestBody =  CsvImportRequestBody.buildImport(object.importTypeNbTable)
        let requestHeader = new CsvImportRequestBodyHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCCsvImportManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendImportData} = MessageUtils();
        sendImportData(requestObject, file);
    }

    /**
     * 批量保存原料物料
     * @param {} object
     */
    static sendSaveRawMaterialRequest = (object) => {
        let requestBody = CsvImportRequestBody.buildSaveRawMaterial(object.dataList);
        let requestHeader = new CsvImportRequestBodyHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCRawMaterialManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 批量保存成品物料
     * @param {} object
     */
     static sendSaveProductRequest = (object) => {
        let requestBody = CsvImportRequestBody.buildSaveProduct(object.dataList);
        let requestHeader = new CsvImportRequestBodyHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCProductManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    /**
     * 保存实验室物料批次
     * @param {} object
     */
    static sendSaveMLotsRequest = (object) => {
        let requestBody = CsvImportRequestBody.buildSaveMLots(object.dataList);
        let requestHeader = new CsvImportRequestBodyHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.VCIncomingMaterialImportSaveDateUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }
}
