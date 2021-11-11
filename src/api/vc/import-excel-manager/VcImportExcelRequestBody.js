

export default class VcImportExcelRequestBody {

    tableRrn;

    constructor(tableRrn){
        this.tableRrn = tableRrn;
    }

    static buildImportExcelGetMLotRequestBody(tableRrn){
        return new VcImportExcelRequestBody(tableRrn)
    }
}