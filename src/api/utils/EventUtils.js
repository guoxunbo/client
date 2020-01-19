import {EventEmitter} from 'events';

/**
 * 前端主要事件处理 包括事件的常量定义
 *  使用EventEmitter
 */
const EventModel = new EventEmitter();

const EventName = {
    ComboxValueChanged : "ComboxValueChanged",
    ButtonLoaded: "ButtonLoaded",
}

export default class EventUtils {
    static displayName = 'EventUtils';

    static getEventEmitter() {
        return EventModel;
    }

    static getEventNames() {
        return EventName;
    }

    static removeAllListener(eventName) {
        EventModel.removeAllListeners(eventName);
    }

    static sendButtonLoaded() {
        this.getEventEmitter().emit(EventName.ButtonLoaded);
    }
}
