import {Application, SessionContext} from "@api/Application";

const EnvMode = {
    Local: "LOCAL",
    Test: "TEST",
    Prod: "PROD",
    Dev: "DEV"
}

/**
 * 根据不同环境取不同的url
 */
const getServerAddress = () => {
    // 默认是local开发地址
    let serverAddress = "http://127.0.0.1:8080";
    if (ENV_MODE === EnvMode.Prod) {
        serverAddress = "http://10.39.0.51:10010";
    } else if (ENV_MODE === EnvMode.Dev) {
        serverAddress = "http://10.39.0.49:10010";
    } else if (ENV_MODE === EnvMode.Test) {
        serverAddress = "http://10.39.0.49:10010";
    }
    return serverAddress;
}

/**
 * 定义URL 不同的模块请求不同的地址
 */
const ModuleUrlConstant = {
    Framework: getServerAddress() + "/framework/",
    Security: getServerAddress() + "/security/",
    UI: getServerAddress() + "/ui/",
    StatusMachine: getServerAddress() + "/common/sm/",
    MMS: getServerAddress() + "/mms/",
    KMS: getServerAddress() + "/kms/",
    RTM: getServerAddress() + "/rtm/",
    GC: getServerAddress() + "/gc/",
    RMS: getServerAddress() + "/rms/",
    VC: getServerAddress() + "/vc/",
}

const DataBaseType = {
    oracle: "oracle"
}
const DateFormatType = {
    Date: "YYYY-MM-DD",
    DateTime: "YYYY-MM-DD HH:mm:ss",
    Time: "HH:mm:ss"
}

const UrlConstant = {
    //Framework
    EntityManagerUrl: "/framework/entityManage",
    EntityUploadFileUrl: "/framework/uploadEntityFile",
    EntityDownloadFileUrl: "/framework/downloadEntityFile",
    EntityListManagerUrl: "/framework/entityListManage",
    ParameterManagerUrl: "/framework/parameterManage",

    //Security
    UserManagerUrl: "/security/userManage",
    UserLoginUrl: "/security/userLogin",
    UserImportUrl: "/security/importUser",
    RoleManagerUrl: "/security/roleManage",
    AuthorityManagerUrl: "/security/authorityManage",

    //UI
    RefListMangerUrl: "/ui/refListManage",
    RefTableManagerUrl: "/ui/refTableManage",
    TableMangerUrl: "/ui/tableManage",
    ExporttUrl: "/ui/export",
    ImportUrl: "/ui/importData",
    MessageManagerUrl: "/ui/messageManage",
    TreeManagerUrl: "/ui/treeManage",

    //SM
    StatusModelManagerUrl: "/common/sm/statusModelManage",

    //KMS
    QuestionManagerUrl: "/kms/questionManage",
    QuestionLineManagerUrl: "/kms/questionLineManage",
    DynaxAnalyseUrl: "/kms/analyseFile",

    //RMS
    EqpRecipeManagerUrl: "/rms/eqpRecipeManage",

    //MMS
    RawMaterialManagerUrl: "/mms/rawMaterialManage",
    MaterialLotManagerUrl: "/mms/materialLotManage",
    MaterialLotInvManagerUrl: "/mms/materialLotInvManage",
    ValidationPackMaterialLotsUrl: "/mms/validationPackMaterialLots",
    PackMaterialLotsUrl: "/mms/packMaterialLots",
    UnPackMaterialLotsUrl: "/mms/unPackMaterialLots",
    MaterialLotStockInUrl: "/mms/stockIn",
    AppendPackMaterialLotsUrl: "/mms/appendPackMaterialLots",
    IncomingMaterialImportReceiveUrl: "/mms/receiveMLotByDoc",
    MMSIssueMLotByDocUrl: "/mms/issueMLotByDoc",
    MateiralLotIqcUrl: "/mms/materialLotIQC",
    MMSIssueMLotByDocLineUrl: "/mms/issueMLotByDocLine",
    MMSReturnMLotByDocUrl: "/mms/returnMLotByDoc",
    MMSCreateReturnMLotOrderUrl: "/mms/createReturnMLotOrder",
    MateiralLotOqcUrl: "/mms/materialLotOQC",
    MMSDeliveryOrderSavetUrl: "/mms/createDeliveryOrder",
    MMSSplitMaterialLotUrl: "/mms/splitMaterialLot",
    StandardSplitMLotUrl: "/mms/splitStandardMaterialLot",
    MMSReleaseMateraiLotUrl: "/mms/releaseMaterialLot",
    MMSHoldMateraiLotUrl: "/mms/holdMaterialLot",
    MMSCreateIssueOrderUrl: "/mms/createIssueOrder",
    MMSIssueMaterialByOrderUrl: "/mms/issueMaterialManager",

    //GC
    FinishGoodManageUrl: "/gc/finishGoodManage",
    GCMaterialLotManagerUrl: "/gc/materialLotManage",
    GCStockOutCheckUrl: "/gc/stockOutCheck",
    GCAsyncUrl: "/gc/asyncManage",
    GCCheckInventoryUrl: "/gc/checkInventory",
    GCReTestUrl: "/gc/reTest",
    GCStockOutUrl: "/gc/stockOut",
    GCStockInUrl: "/gc/stockIn",
    GCGetPringBboxParameterUrl: "/gc/getPrintBboxParameter",
    GCValidationSoOrReTestUrl: "/gc/validationSoOrReTest",

    //VC
    VCIncomingMaterialImportUrl: "/vc/IncomingMaterialImport",
    VCIncomingMaterialImportSaveDateUrl: "/vc/IncomingMaterialSave",
    VCIncomingMaterialDeleteUrl: "/vc/IncomingMaterialDelete",
    VCIssueMLotByDocLineUrl: "/vc/issueMLotByDocLine",
    VCIssueMLotByDocUrl: "/vc/issueMLotByDoc",
    VCReturnMLotByDocUrl: "/vc/returnMLotByDoc",
    VCAppendPackMaterialLotsUrl: "/vc/appendPackMaterialLots",
    VCFinishGoodReceiveUrl: "/vc/receiveFinishGood",
    VCFinishGoodReservedUrl: "/vc/finishGoodReserved",
    VCGetPrintBoxParameterUrl: "/vc/getPrintBoxParameter",
    VCMaterialLotStockInUrl: "/vc/stockInFinishGood",
    VCMaterialLotStockOutUrl: "/vc/stockOut",
    VCPackMaterialLotsUrl: "/vc/packMaterialLots",
    VCProductManagerUrl: "/vc/productManager",
    VCInventoryManagerUrl: "/vc/inventoryManager",
    VCGetPrintParameterUrl: "/vc/printParameterManager",
    VCPackCheckUrl: "/vc/packCheckManager",
    VCUnPackMaterialLotsUrl: "/vc/unPackMaterialLots",
    VCWeightMaterialLotUrl: "/vc/mlotWeight",
    VCCsvImportManagerUrl: "/vc/csvImport",
    VCRawMaterialManagerUrl: "/vc/rawMaterialManager",
    VCMateiralLotIqcUrl: "/vc/materialLotIQC",
    VCStorageManagerUrl: "/vc/storageManager",
    VCStorageImportUrl: "/vc/storageImport",
    VCMobileManagerUrl: "/vc/mobileManager",
    VCLabMaterialImportUrl: "/vc/labMaterialImport",
    VCLabMaterialManagertUrl: "/vc/labMaterialManager",
    VCShipOutMLotUrl: "/vc/shipOut",
    VCCreateIssueOrderUrl: "/vc/createIssueOrder",
    VCIssueLabMLotManagerUrl: "/vc/issueLabMLotManager",
    VCPrintExcelManagerUrl: "/vc/printExcel",
    VCPartsMaterialManagerUrl: "/vc/partsMaterialManage",
    VCQueryOrderManagerUrl: "/vc/queryOrderManager",
};

const SystemRefListName = {
    Language: "Language",
    ReelStandardQty: "ReelStandardQty"
};

const RefTableName = {
    NBOrg: "NBOrg"
};

const EntityModel = {
    NBMessage: "com.newbiest.base.model.NBMessage",
    NBUser: "com.newbiest.security.model.NBUser",
    MaterialEvent: "com.newbiest.mms.state.model.MaterialEvent"
};

/**
 * 成功失败标志位
 */
const ResultIdentify = {
    Success: "SUCCESS",
    Fail: "FAIL",
    Yes: "Y",
    No: "N"
};

const Language = {
    Chinese: "Chinese",
    English: "English"
};

const DefaultStatusList = {
    InActive: "InActive",
    UnFrozen: "UnFrozen",
    Frozen: "Frozen",
    Active: "Active"
};
/**
 * 所有对象都有自动带出的主键
 */
const DefaultRowKey = "objectRrn";

/**
 * 默认的排序栏位。没手动给值的时候要自动生成值。即表格中数据的最大值加1
 */
const DefaultOrderKey = "seqNo";

//js里面typeof判断所需要的类型
const Type = {
    function: "function"
}

const SqlType = {
    And: " AND ",
    Eq: " = ",
    Where: " WHERE ",
    Like: " LIKE ",
    Gt: " >= ",
    Lt: " <= ",
    toDate: "to_date",
    DateTime: "YYYY-MM-DD HH24:mi:ss",
    Date: "YYYY-MM-DD",
    NoResultCondition: "1 != 1"
}

const baseURl = getServerAddress();
const timeout = Application.timeOut
const headers = {
    'Content-Type': "application/json;charset=utf-8",
    authorization: SessionContext.getToken()
}


export {
    UrlConstant, DefaultStatusList, DataBaseType, DateFormatType,
    SystemRefListName, RefTableName, EntityModel, ResultIdentify, Language, DefaultRowKey,
    DefaultOrderKey, Type, SqlType, timeout, headers, baseURl
};
