import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "MaterialLotWeight";

export default class WeightMLotRequestHeader extends RequestHeader{

    constructor(){
        super(MESSAGE_NAME);
    }
}