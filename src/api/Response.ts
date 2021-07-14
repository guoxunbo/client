import {ResponseHeader  } from "@api/ResponseHeader";

interface responseType{
    header:any,body:any
}

function Response(this:responseType,responseHeader:object, responseBody:object) {
    this.header = new ResponseHeader(responseHeader);
    this.body = responseBody;
};

export {Response};
