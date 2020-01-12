import {ResultIdentify, Language} from '@const/ConstDefine';
import NoticeUtils from '@utils/NoticeUtils';

import {Response} from "@api/Response";
import {ResponseHeader} from "@api/ResponseHeader";

import axios from "axios";
import { SessionContext } from '@api/Application';
import I18NUtils from '@utils/I18NUtils';
import EventUtils from '@utils/EventUtils';
import { i18NCode } from '@const/i18n';
import fetchJsonp from 'fetch-jsonp';
/**
 *  消息主要发送类
 */
export default class MessageUtils {
    
    /**
     * 同时发送2个请求，并且都处理完毕一起返回
     * 常用场景比如用户组获取用户和获取所有用户一起使用
     * @param requestObject
     * @example {requests: [request1, request2...], success:}
     */
    static sendTwoRequest(requestObject) {
        let self = this;
        let requests = requestObject.requests;
        if (Array.isArray(requests)) {
            let axioses = [];
            requests.forEach((requestObject)=>{
                let request = requestObject.request;
                axioses.push(axios.post(request.url, request, {
                    headers:{
                        authorization: SessionContext.getToken()
                    }
                }));
            });
            axios.all(axioses).then(axios.spread(function(responseValue1, responseValue2) {
                // 处理2个reponse 都成功才回调Object.success
                let response1 = new Response(responseValue1.data.header, responseValue1.data.body);
                let response2 = new Response(responseValue2.data.header, responseValue2.data.body);
                if (ResultIdentify.Fail == response1.header.result) {
                    self.handleException(response1.header);
                    return;
                } 
                if (ResultIdentify.Fail == response2.header.result) {
                    self.handleException(response2.header);
                    return;
                } 
                if (requestObject.success) {
                    requestObject.success(response1.body, response2.body);
                } else {
                    this.showOperationSuccess();
                }
            })).catch(function(exception) {
                self.handleException(exception);
            });
        } else {

        }
    }

    /**
     * 发送导入请求
     *  因为json似乎是没有表达内嵌文件的格式.所有需要封装formData进行提交
     * @param requestObject {url:"", request:{param1, param2},}
     * @param file 文件
     */
    static sendImportData(requestObject, file) {
        let self = this;
        let formData = new FormData();
        formData.append("file", file);
        let request = requestObject.request;
        for (let propName in requestObject) {
            if (propName === "request") {
                formData.append(propName, JSON.stringify(request));
            } else {
                formData.append(propName, requestObject[propName]);
            }
        }
        axios.post(request.url, formData, {
            headers: { 'Content-Type': 'multipart/form-data',  authorization: SessionContext.getToken() }
        }).then(function(object) {
            let response = new Response(object.data.header, object.data.body);
            if (ResultIdentify.Fail == response.header.result) {
                self.handleException(response.header);
            } else {
                if (requestObject.success) {
                    requestObject.success(response.body);
                } else {
                    self.showOperationSuccess();
                }
            }
        }).catch(function(exception) {
            self.handleException(exception);
        }); 

    }

    /**
     * 发送导出数据请求比如导出excel 具体类型由contnt-type决定
     * 因为导出的时候不要返回体的。只需返回字节流即可
     * @param requestObject {url:"", request:{param1, param2},}
     * @param fileName 文件名字
     */
    static sendExpRequest(requestObject, fileName) {
        let self = this;
        let request = requestObject.request;
        axios.post(request.url, request, {
            responseType: 'blob',
            headers: {
                authorization: SessionContext.getToken()
            }
        }).then(function(object) {
            let type = object.headers['content-type'];
            let blob = new Blob([object.data], { type: type}); 
            let reader = new FileReader();
            reader.onload = e => {
                if (e.target.result.indexOf("result") != -1) {
                    let result = JSON.parse(e.target.result);
                    let response = new Response(result.header, result.body);
                    self.handleException(response.header);
                } else {
                    let elink = document.createElement('a');
                    elink.download = fileName;
                    elink.style.display = 'none';
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    document.body.removeChild(elink);
                    self.showOperationSuccess();
                }
            }
            reader.readAsText(blob);
            EventUtils.sendButtonLoaded();
        }).catch(function(exception) {
            self.handleException(exception);
        }); 
    }

    /**
     * 发送异步请求
     */
    static sendRequest(requestObject) {
        let self = this;
        let request = requestObject.request;
        debugger;
        axios.post(request.url, request, {
            timeout: 10000,
            headers:{
                authorization: SessionContext.getToken(),
            }
        }).then(function(object) {
            console.log(object);
            let response = new Response(object.data.header, object.data.body);
            if (ResultIdentify.Fail == response.header.result) {
                if (requestObject.fail) {
                    requestObject.fail();
                }
                self.handleException(response.header);
            } else {
                if (object.headers.authorization) {
                    console.log("aaa");
                    SessionContext.saveToken(object.headers.authorization);
                }
                if (requestObject.success) {
                    requestObject.success(response.body);
                } else {
                    self.showOperationSuccess();
                }
            }
        }).catch(function(exception) {
            self.handleException(exception);
        }); 
    }

    /**
     * 发送Get请求
     *  一般用于打印机等
     */
    static sendGetRequest(requestObject) {
        let self = this;
        axios.get(requestObject.url, {
            params: requestObject.params
        }).then(function(object) {
            if (requestObject.success) {
                requestObject.success(object.data);
            } else {
                self.showOperationSuccess();
            }
        }).catch(function(exception) {
            self.handleException(exception);
        }); 
    }

    /**
     * 发送Jsonp请求
     *  
     */
    static sendJsonpRequest(requestObject) {
        let url = requestObject.url;
        let params = requestObject.params;
        let paramFlag= url.indexOf('?') === -1 ? '?' : '&';
        url += `${paramFlag}`;
        if (params) {
            for (let i in params) {
                url += `${i}=${params[i]}&`
            }
        }
        url = url.substring(0, url.length-1); 
        fetchJsonp(url).then(function(response) {
            console.log(response);
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })
    }

    /**
     * 操作成功
     */
    static showOperationSuccess = (code) => {
        if (!code) {
            code = i18NCode.OperationSucceed;
        }
        NoticeUtils.showSuccess(I18NUtils.getClientMessage(code));
    }

    static handleException(exception) {
        console.log(exception);
        let error = "";
        let errroCode = 0;
        let language = SessionContext.getLanguage();
        if (!language) {
            language = Language.Chinese;
        }
        if (exception instanceof ResponseHeader) {
            if (language == Language.Chinese) {
                error = exception.resultChinese;
            } else if (language == Language.English) {
                error = exception.resultEnglish;
            }
            if (error == null || error == "") {
                error = exception.resultCode;
            }
            errroCode = exception.messageRrn;
        } else if (exception.response) {
            // 处理一些server内部错误，比如拦截器里抛出的异常，无法回复200的异常
            let response = exception.response;
            if (response.data) {
                if (language == Language.Chinese) {
                    error = response.data.resultChinese;
                } else if (language == Language.English) {
                    error = response.data.resultEnglish;
                }
                if (error == null || error == "") {
                    error = response.data.resultCode;
                }
                errroCode = response.data.messageRrn;
            }
            // 当验证过期的时候，需要重新登录
            if (exception.response.status === 401) {
                window.location.href = "/";
            }
        } else {
            // String的不是后台的错误 需要去加载Client端的i18N信息
            if (exception == "Error: Network Error") {
                error = I18NUtils.getClientMessage(i18NCode.NetworkError);
            } else if (exception == "Error: timeout of 10000ms exceeded") {
                //TODO
                error = "Error: timeout of 10000ms exceeded";
            } else {
                error = exception;
            }
        }
        NoticeUtils.showError(errroCode, error);
    }
}

