import RequestHeader from "@api/RequestHeader";
const MESSAGE_NAME = "EqpRecipeManager";

export default class EqpRecipeRequestHeader extends RequestHeader{

    constructor() {  
        super(MESSAGE_NAME);
    }

}