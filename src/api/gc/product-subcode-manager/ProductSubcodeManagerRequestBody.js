export default class ProductSubcodeManagerRequestBody {

    productSubcode;

    constructor(productSubcode){
        this.productSubcode = productSubcode;
    }

    static buildMergeProductSubcode(productSubcode) {
        return new ProductSubcodeManagerRequestBody(productSubcode);
    }

}

