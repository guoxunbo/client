import PropertyUtils from "@utils/PropertyUtils";

/**
 * Bartender打印的回复的DTO
 * // 当设置了打印份数，却没传递份数会报此错。不会打印。error级别
 * {"Version":"1.0","Status":"Faulted","WaitStatus":"Faulted","Validated":true,"Messages":
 * [{"ActionName":null,"Level":4,"Text":"无法运行操作“打印文档”，因为每个序列号的副本数值“”无效。请指定有效的数字，再重新运行该操作。"}]}
 * 
 * // 当btw文件中，不允许栏位为空的数据。会触发打印，但是会报错。警告级别
 * {"Version":"1.0","Status":"Faulted","WaitStatus":"Faulted","Validated":true,"Messages":
 * [{"ActionName":null,"Level":4,"Text":"由于以下错误，打印作业“BBOX2.btw”未完成: “barcode 2”具有空数据。"}]}
 * 
 * // 打印成功
 * {"Version":"1.0","Status":"RanToCompletion","WaitStatus":"Completed","Validated":true,"Messages":[]}
 */
const ResponseStatus = {
    Faulted: "Faulted",
    RanToCompletion: "RanToCompletion",
};
const ResponseWaitStatus = {
    Faulted: "Faulted",
    Completed: "Completed",
};

export default class BtPrintResponse {

    Version;
    Status;
    WaitStatus;
    Validated;
    Messages;
    
    constructor(response) {
        PropertyUtils.copyProperties(response, this);
    }
}

export {ResponseStatus, ResponseWaitStatus}