import {ResponseHeader} from "@api/ResponseHeader";

type requestParams = {
    transactionId: string; result: string; resultCode: string; parameters: string
}

const Response: (responseHeader: object, responseBody: object) => { header: requestParams; body: object } = (responseHeader:object, responseBody:object)=> {
    let header = ResponseHeader(responseHeader);
    let body = responseBody;
    return {header,body}
}

export {Response};
