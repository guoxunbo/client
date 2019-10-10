import MessageUtils from '@utils/MessageUtils';
import BtPrintResponse, { ResponseStatus, ResponseWaitStatus } from '@api/dto/bartender/BtPrintResponse';
import NoticeUtils from '@utils/NoticeUtils';

const PrintParamterName = {
    printCount: "printCount"
}
/**
 * 打印工具类
 *  支持普通页面打印以及调用bartender进行打印
 */
export default class PrintUtils {
    static displayName = 'PrintUtils';

    /**
     * 调用bartender的IntergrationBuilder的web服务打印
     * @param url 路径
     * @param parameters 参数
     * @param printCount 打印份数
     */
    static printWithBtIbForWeb = (url, parameters, printCount) => {
        if (!printCount || !Number(printCount) || Number(printCount) == 0) {
            console.info("PrintCount is not a number or not set. [" + printCount + "]. so reset it to 1")
            printCount = 1;
            if (!parameters) {
                parameters = {};
            }
        }
        parameters[PrintParamterName.printCount] = printCount;
        let requestObject = {
            url: url,
            params: parameters,
            success: function(response) {
                let btPrintResponse = new BtPrintResponse(response);
                if (ResponseStatus.RanToCompletion === btPrintResponse.Status){
                    if (ResponseWaitStatus.Completed === btPrintResponse.WaitStatus) {
                        MessageUtils.showOperationSuccess();
                    }
                } else if (ResponseStatus.Faulted === btPrintResponse.Status) {
                    let message = btPrintResponse.Messages[0].Text;
                    // 具备库数据只不过是.btw模板文件上，进行了空的提示。还是会执行打印。所以不算打印失败
                    if (message.indexOf("具有空数据") != -1) {
                        NoticeUtils.showNotice("打印成功，但是有栏位是空数据。" + message)
                    } else {
                        Notification.showError("打印失败:" + message);
                    }
                }
            }
        };
        MessageUtils.sendGetRequest(requestObject);
    }
}
