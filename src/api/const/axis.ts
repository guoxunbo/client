import { timeout,headers,baseURl } from "@const/ConstDefine";
import axios from "axios";
import {SessionContext} from "@api/Application";

//封装请求使用
const Fetch = (url:string, type:string, params:any) => {
    const http=axios.create({
        baseURL: baseURl,
        timeout: timeout,
        headers: headers,
        url:url
    });
    if(type=='get'||type=='undefined'){
        return http.get(url,params)
    }else if(type=="put"){
        return http.put(url,params)
    }else if(type=='post'){
        return http.post(url,params)
    }else if(type=='ImportData'){
        return http.post(url,params,{
            headers: { 'Content-Type': 'multipart/form-data',  authorization: SessionContext.getToken() }
        })
    }else if(type=='ExpExcel'){
        return http.post(url,params,{
            responseType: 'blob',
            headers: {
                authorization: SessionContext.getToken()
            },
        })
    }
}

export {Fetch}

