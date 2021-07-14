import {baseURl} from "@const/ConstDefine"

interface RequestType {
    header: any,body:object,url:string
}

function Request (this: RequestType, requestBody:object, url:string){
    this.body = requestBody;
    this.url = !url?baseURl:url
};

export {Request};

