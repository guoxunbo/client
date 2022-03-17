
const ResponseHeader: (header: object) =>{ transactionId: string; result: string; resultCode: string; parameters: string } = (header:any)=> {
    let transactionId = header.transactionId;
    let result = header.result;
    let resultCode = header.resultCode;
    let parameters = header.parameters;

    return {transactionId,result,resultCode,parameters}
}


export {ResponseHeader}
