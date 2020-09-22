import Table from "../../dto/ui/Table";

export default class ProductSubcodeManagerRequestBody {

    productSubcode;
    table;

    constructor(productSubcode, table){
        this.productSubcode = productSubcode;
        this.table = table;
    }

    static buildMergeProductSubcode(productSubcode) {
        return new ProductSubcodeManagerRequestBody(productSubcode);
    }

    static buildImportProductSubcode(objectRrn) {
        let table = new Table();
        table.setObjectRrn(objectRrn);
        return new ProductSubcodeManagerRequestBody(undefined, table);
    }
}

