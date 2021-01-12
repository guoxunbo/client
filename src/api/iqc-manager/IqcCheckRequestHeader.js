import RequestHeader from "../RequestHeader";
const MESSAGE_NAME = "IqcCheckManager";

export default class IqcCheckRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}
