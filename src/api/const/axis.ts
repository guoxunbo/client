import {timeout, headers, baseURl} from "@const/ConstDefine";
import axios from "axios";
// @ts-ignore
import uuid from 'react-native-uuid';
import {SessionContext} from "@api/Application";
import RequestHeader from "@api/RequestHeader";
import {ResponseHeader} from "@api/ResponseHeader";

//封装请求使用
const Fetch:any= (url: string, type: string, params: any, requestHeader:RequestHeader) => {
    const http = axios.create({
        baseURL: baseURl,
        timeout: timeout,
        headers: headers,
        url: url
    });

    //请求拦截
    http.interceptors.request.use(
        config => {
            config.data.header = requestHeader;
            return config
        },
        error => {
            console.log(error);
            return Promise.reject(error);
        }
    );

    //响应拦截
    http.interceptors.response.use(
    response => {//响应格式编辑
        let responseX = response;
        responseX.data.header = ResponseHeader(response.data.header);
        return responseX;
    },
    error => {
        return Promise.reject(error)
    })


    if (type == 'get' || type == 'undefined') {
        return http.get(url, params)
    } else if (type == "put") {
        return http.put(url, params)
    } else if (type == 'post') {
        return http.post(url, params)
    } else if (type == 'ImportData') {
        return http.post(url, params, {
            headers: {'Content-Type': 'multipart/form-data', authorization: SessionContext.getToken()}
        })
    } else if (type == 'ExpExcel') {
        return http.post(url, params, {
            responseType: 'blob',
            headers: {
                authorization: SessionContext.getToken()
            },
        })
    }


}

export {Fetch}

