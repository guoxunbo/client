import RequestHeader from "../../RequestHeader";

const MESSAGE_NAME = "GCWeight";

export default class WeightManagerRequestHeader extends RequestHeader{

    constructor() {
        super(MESSAGE_NAME);
    }

}