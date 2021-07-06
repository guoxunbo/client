import * as React from "react";
import {ResultIdentify, Language, UrlConstant} from '../const/ConstDefine';
import {Fetch} from '../../config/axis'
import NoticeUtils from '../utils/NoticeUtils';
import {Response} from '../../api/Response';
import {ResponseHeader} from '../../api/ResponseHeader';
import axios from "axios";
import {SessionContext, Application} from '../../api/Application';
import I18NUtils from '../utils/I18NUtils';
import EventUtils from '../utils/EventUtils';
import {i18NCode} from '../const/i18n';
import MessageRequestBody from '../../api/message-manager/MessageRequestBody';
import MessageRequestHeader from '../../api/message-manager/MessageRequestHeader';
import Request from "../Request";

/**
 *  消息主要发送类
 */

export default function MessageUtils(): React.ReactNode {

    /**
     * 同时发送2个请求，并且都处理完毕一起返回
     * 常用场景比如用户组获取用户和获取所有用户一起使用
     * @param requestObject
     * @example {requests: [request1, request2...], success:}
     */
     const  sendTwoRequest= async (requestObject: any) => {
        let requests = requestObject.requests;
        if (Array.isArray(requests)) {
            let axioses: any = [];
            requests.forEach((requestObject) => {
                let request = requestObject.request;
                axioses.push(axios.post(request.url, request, {
                    headers: {
                        authorization: SessionContext.getToken(),
                    },
                }));
            });
            await Promise.all(axioses).then(([responseValue1, responseValue2]: any) => {
                let response1 = new Response(responseValue1.data.header, responseValue1.data.body);
                let response2 = new Response(responseValue2.data.header, responseValue2.data.body);
                if (ResultIdentify.Fail == response1.header.result) {
                    handleException(response1.header);
                    return;
                }
                if (ResultIdentify.Fail == response2.header.result) {
                    handleException(response2.header);
                    return;
                }
                if (requestObject.success) {
                    requestObject.success(response1.body, response2.body);
                } else {
                    NoticeUtils.showSuccess();
                }
            }).catch(function (exception) {
                handleException(exception);
            });
        }
    };


    /**
     * 发送导入请求
     *  因为json似乎是没有表达内嵌文件的格式.所有需要封装formData进行提交
     * @param requestObject {url:"", request:{param1, param2},}
     * @param file 文件
     */
    const sendImportData = (requestObject: any, file: any): void => {
        let formData = new FormData();
        formData.append('file', file);
        let request = requestObject.request;
        for (let propName in requestObject) {
            if (propName === 'request') {
                formData.append(propName, JSON.stringify(request));
            } else {
                formData.append(propName, requestObject[propName]);
            }
        }
        try {
            const object:any = axios.post(request.url, formData, {
                headers: {'Content-Type': 'multipart/form-data', authorization: SessionContext.getToken()},
            });
            let response = new Response(object.data.header, object.data.body);
            if (ResultIdentify.Fail == response.header.result) {
                handleException(response.header);
            } else {
                if (requestObject.success) {
                    requestObject.success(response.body);
                } else {
                    NoticeUtils.showSuccess();
                }
            }
        }catch (exception){
            handleException(exception);
        }
    };

    /**
     * 发送导出数据请求比如导出excel 具体类型由contnt-type决定
     * 因为导出的时候不要返回体的。只需返回字节流即可
     * @param requestObject {url:"", request:{param1, param2},}
     * @param fileName 文件名字
     */
    const sendExpRequest = (requestObject: any, fileName: any): void => {
        let request = requestObject.request;
        try {
            const object:any = axios.post(request.url, request, {
                responseType: 'blob',
                headers: {
                    authorization: SessionContext.getToken()
                },
            });
            let type = object.headers['content-type'];
            let blob = new Blob([object.data], {type: type});
            let reader = new FileReader();
            reader.onload = (e: any) => {
                if (e.target.result.indexOf('result') != -1) {
                    let result = JSON.parse(e.target.result);
                    let response = new Response(result.header, result.body);
                    handleException(response.header);
                } else {
                    let elink = document.createElement('a');
                    elink.download = fileName;
                    elink.style.display = 'none';
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    document.body.removeChild(elink);
                    NoticeUtils.showSuccess();
                }
            };
            reader.readAsText(blob);
            EventUtils.sendButtonLoaded();
        }catch (exception){
            handleException(exception);
        }
    };

    /**
     * 发送同步请求 需要配合await使用
     * @param {} requestObject
     * @return Promise对象。取出里面的值需要通过Promise.resolve取出
     */
    const sendSyncRequest = async (requestObject: any) => {
        debugger
        let request = requestObject.request;
        let timeOut = request.timeOut || Application.timeOut;
        try {
            const object:any =  await Fetch(request.url,'post', request);
            let response = new Response(object.data.header, object.data.body);
            if (ResultIdentify.Fail == response.header.result) {
                if (requestObject.fail) {
                    return requestObject.fail();
                }
                handleException(response.header);
            } else {
                EventUtils.sendButtonLoaded();
                return response.body;
            }
        }catch (exception){
            handleException(exception);
        }
    };

    /**
     * 发送异步请求
     */
    const sendRequest = async (requestObject: any) => {
        let request = requestObject.request;
        let timeOut = request.timeOut || Application.timeOut;
        try {
            const object:any = await Fetch(request.url,'post',request);
            let response = new Response(object.data.header, object.data.body);
            if (ResultIdentify.Fail == response.header.result) {
                if (requestObject.fail) {
                    requestObject.fail();
                }
                handleException(response.header);
            } else {
                if (object.headers.authorization) {
                    SessionContext.saveToken(object.headers.authorization);
                }
                if (requestObject.success) {
                    requestObject.success(response.body);
                } else {
                    NoticeUtils.showSuccess();
                }
                EventUtils.sendButtonLoaded();
            }

        }catch(exception){
            handleException(exception);
        }
    };

    /**
     * 发送Get请求
     *  一般用于打印机等
     */
    const sendGetRequest = async (requestObject: any) => {
        debugger
        try {
            const object:any = await Fetch(requestObject.url,'get', requestObject.params);
            if (requestObject.success) {
                requestObject.success(object.data);
            } else {
                NoticeUtils.showSuccess();
            }
        }catch(exception){
            handleException(exception);
        }
    };

    /**
     * 异常返回提示
     */
     function  handleException(exception:any){
        debugger
        if (exception.response) {
            console.log(exception.response);
            if (exception.response.status === 401) {
                EventUtils.sendTokenError();
                return;
            }
        }
        let error = '';
        let errroCode = 0;
        let language = SessionContext.getLanguage();
        if (!language) {
            language = Language.Chinese;
        }
        if (exception instanceof ResponseHeader) {
            error = exception.resultCode;
            let requestBody = MessageRequestBody.buildGetByKeyId(error, exception.parameters);
            let requestHeader = new MessageRequestHeader();
            let requestObject = {
                request: new Request(requestHeader, requestBody, '/ui/messageManage'),
            };
            let responseBody: any = async () => {
                await sendSyncRequest(requestObject);
            };
            if (responseBody.message) {
                if (language == Language.Chinese) {
                    error = responseBody.message.messageZh;
                } else if (language == Language.English) {
                    error = responseBody.message.message;
                }
                errroCode = responseBody.message.objectRrn;
            }
        } else {
            let errorMessage = exception.message;
            // String的不是后台的错误 需要去加载Client端的i18N信息
            if (errorMessage === 'Network Error') {
                error = I18NUtils.getClientMessage(i18NCode.NetworkError);
            } else if (errorMessage.indexOf('timeout') != -1) {
                error = I18NUtils.getClientMessage(i18NCode.TimeOut);
            } else {
                console.error(exception);
                error = exception;
            }
        }
        NoticeUtils.showError(errroCode, error);
        EventUtils.sendButtonLoaded();
    };



    return {
        sendTwoRequest,
        sendImportData,
        sendExpRequest,
        sendSyncRequest,
        sendRequest,
        sendGetRequest,
    }

}
