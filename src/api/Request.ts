import {baseURl} from "@const/ConstDefine"

const Request: (requestBody:object, requestUrl:string) => {body: object; url: string } = (requestBody:object, requestUrl:string)=> {
    let body = requestBody;
    let url = !requestUrl?baseURl:requestUrl;
    return {body,url}
}

export {Request};

