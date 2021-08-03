
import { notification } from 'antd';

import {Application} from '@api/Application';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';

export default class NoticeUtils {

    static showSuccess(message) {
        if (!message) {
            message = I18NUtils.getClientMessage(i18NCode.OperationSucceed);
        }
        notification["success"]({
            message: message,
            duration: Application.notice.duration,
            key: i18NCode.OperationSucceed
        });
    }

    static showError(errorCode, message) {
        notification["error"]({
            message: errorCode,
            description: message,
            duration: Application.notice.duration,
        });
    }

    static showNotice(message) {
        notification["info"]({
            message: message,
            duration: Application.notice.duration,
        });
       
    }

    /**
     * 提醒框不会消失
     * @param {}} message 
     */
    static showInfo(message) {
        notification["info"]({
            message: message,
            duration: 0,
        });
    }

    /**
     * @param {*} placement 消息出现的位置
     */
    static mobileShowSuccess(message, placement) {
        if (!message) {
            message = I18NUtils.getClientMessage(i18NCode.OperationSucceed);
        }
        notification["success"]({
            message: message,
            duration: Application.notice.duration,
            key: i18NCode.OperationSucceed,
            placement,
        });
    }
} 

const placement = {
    topLeft:"topLeft",
    topRight:"topRight",
    bottomLeft:"bottomLeft",
    bottomRight:"bottomRight",
}
