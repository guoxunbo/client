import RequestHeader from "../../RequestHeader";
const MESSAGE_NAME = "IRAPackageManager";
export default class IraPackageRequestHeader extends RequestHeader{
    constructor() {
        super(MESSAGE_NAME);
    }
}