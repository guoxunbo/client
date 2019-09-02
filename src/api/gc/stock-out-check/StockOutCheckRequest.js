import StockOutCheckRequestHeader from './StockOutCheckRequestHeader';
import StockOutCheckRequestBody from './StockOutCheckRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';
import TableManagerRequestBody from '../../table-manager/TableManagerRequestBody';
import TableManagerRequestHeader from '../../table-manager/TableManagerRequestHeader';

export default class StockOutCheckRequest {

    static sendJudgePackedMaterialLotRequest = (object) => {
        const {materialLots, checkList} = object;
        let requestBody = StockOutCheckRequestBody.buildJudge(materialLots, checkList);
        let requestHeader = new StockOutCheckRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCStockOutCheckUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    /**
     * 同时发送2个请求，一个请求为获取表格，一个请求为获取数据
     */
    static sendGetTableAndGetCheckDataRequest = (object) => {
        let requests = [];
        // 构建获取表格栏位请求
        let requestBody = TableManagerRequestBody.buildGetByName(object.tableName);
        let requestHeader = new TableManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.TableMangerUrl);
        let requestObject = {
            request: request,
        }
        requests.push(requestObject);

        requestBody = StockOutCheckRequestBody.buildGetCheckData();
        requestHeader = new StockOutCheckRequestHeader();
        request = new Request(requestHeader, requestBody, UrlConstant.GCStockOutCheckUrl);
        requestObject = {
            request: request,
        }
        requests.push(requestObject);

        let messageObject = {
            requests: requests,
            success: object.success
        }
        MessageUtils.sendTwoRequest(messageObject);
    }
    
}