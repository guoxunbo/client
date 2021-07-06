import { timeout,headers,baseUrl } from "./config"
import axios from "axios";

//封装请求使用
const Fetch = (url:string, type:string, params:any) => {
    const http=axios.create({
        baseURL: baseUrl,
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
    }
}

export {Fetch}

