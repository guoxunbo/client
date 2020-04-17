class ResponseHeader{

    transactionId;
	result;
	resultCode;
    parameters;

    constructor(header) {
        this.transactionId = header.transactionId;
        this.result = header.result;
        this.resultCode = header.resultCode;
        this.parameters = header.parameters;
    }
    
}
export {ResponseHeader}
