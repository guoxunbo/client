import {ResponseHeader} from "@api/ResponseHeader";

const Response: (responseHeader: object, responseBody: object) => { header: { transactionId: string; result: string; resultCode: string; parameters: string }; body: object } = (responseHeader:object, responseBody:object)=> {
    let header = ResponseHeader(responseHeader);
    let body = responseBody;
    return {header,body}
}

export {Response};
