export default class UnConfirmWaferSet {

    objectRrn;
    serialNumber;
    lotId;
    waferId;
    testSite;
    modelId;
    exceptionClassify;
    riskGrade;

    setObjectRrn(objectRrn) {
        this.objectRrn = objectRrn;
    }
    
    setSerialNumber(serialNumber) {
        this.serialNumber = serialNumber;
    }

    setLotId(lotId) {
        this.lotId = lotId;
    }

    setWaferId(waferId) {
        this.waferId = waferId;
    }

    setTestSite(testSite) {
        this.testSite = testSite;
    }

    setModelId(modelId) {
        this.modelId = modelId;
    }

    setExceptionClassify(exceptionClassify) {
        this.exceptionClassify = exceptionClassify;
    }

    setRiskGrade(riskGrade) {
        this.riskGrade = riskGrade;
    }

}