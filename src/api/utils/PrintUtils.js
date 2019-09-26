import {EventEmitter} from 'events';
import { Notification } from '../../components/notice/Notice';
import I18NUtils from './I18NUtils';
import MessageUtils from './MessageUtils';
import MaterialLot from '../dto/mms/MaterialLot';
import PropertyUtils from './PropertyUtils';
import { DefaultRowKey } from '../const/ConstDefine';

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
     */
    static printWithBtIbForWeb = (url, parameters) => {
        console.log(url);
        console.log(parameters);
        //TODO 根据对象类型去找到对应的
        let requestObject = {
            url: url,
            params: parameters 
        };
        MessageUtils.sendJsonpRequest(requestObject);
    }
}
