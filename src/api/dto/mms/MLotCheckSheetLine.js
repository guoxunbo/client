export default class MLotCheckSheetLine {

    name;

    description;

    mLotCheckSheetRrn;

    sheetName;

    sheetDesc;

    checkResult;

    checkTime;

    checkOwner;

    actionComment;

    samplingRemark;

    samplingScheme;

    setName(name){
        this.name = name;
    }

    setDescription(description){
        this.description = description;
    }

    setMLotCheckSheetRrn(mLotCheckSheetRrn){
        this.mLotCheckSheetRrn = mLotCheckSheetRrn;
    }

    setSheetName(sheetName){
        this.sheetName = sheetName;
    }

    setSheetDesc(sheetDesc){
        this.sheetDesc = sheetDesc;
    }

    setCheckResult(checkResult){
        this.checkResult = checkResult;
    }

    setCheckTime(checkTime){
        this.checkTime = checkTime;
    }

    setCheckOwner(checkOwner){
        this.checkOwner = checkOwner;
    }

    setActionComment(actionComment){
        this.actionComment = actionComment;
    }

    setSamplingRemark(samplingRemark){
        this.samplingRemark = samplingRemark;
    }

    setSamplingScheme(samplingScheme){
        this.samplingScheme = samplingScheme;
    }
}