export default class GetPrintWltBoxParameterRequestBody {

    materialLotUnitList;

    constructor(materialLotUnitList){
        this.materialLotUnitList = materialLotUnitList;
    }

    static buildQuery(materialLotUnitList) {
        return new GetPrintWltBoxParameterRequestBody(materialLotUnitList);
    }

}


