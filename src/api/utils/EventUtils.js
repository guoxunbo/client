import {EventEmitter} from 'events';

/**
 * 前端主要事件处理 包括事件的常量定义
 *  使用EventEmitter
 */
const EventModel = new EventEmitter();

const EventNameList = {
    ComboxValueChanged : "ComboxValueChanged",
    ParentTableRowSelected: "ParentTableRowSelected",
    ButtonLoaded: "ButtonLoaded",
    TokenError: "TokenError",
}

export default class EventUtils {
    static displayName = 'EventUtils';

    static getEventEmitter() {
        return EventModel;
    }

    static getEventNames() {
        return EventNameList;
    }

    static removeAllListener(eventName) {
        EventModel.removeAllListeners(eventName);
    }

    static sendButtonLoaded() {
        this.getEventEmitter().emit(EventNameList.ButtonLoaded);
    }

    static sendTokenError() {
        this.getEventEmitter().emit(EventNameList.TokenError);
    }
}
