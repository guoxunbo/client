import WeightModel from "./WeightModel";


const ActionType = {
    Query: "Query",
    Weight: "Weight",
} 

export default class WeightManagerRequestBody {

    actionType;
    materialLotId;
    weightModels;
    tableRrn;

    constructor(actionType,materialLotId, tableRrn){
        this.actionType = actionType;
        this.materialLotId = materialLotId;
        this.tableRrn = tableRrn;
    }

    setWeightModels (weightModels) {
        this.weightModels = weightModels;
    }

    static buildQuery(materialLotId, tableRrn) {
        return new WeightManagerRequestBody(ActionType.Query, materialLotId, tableRrn);
    }

    static buildWeight(materialLots) {
        let weightModels = [];
        materialLots.forEach(materialLot => {
            let weightModel = new WeightModel(materialLot.materialLotId, materialLot.weight, materialLot.boxsWeightFlag);
            weightModels.push(weightModel);
        });

        let requestBody = new WeightManagerRequestBody(ActionType.Weight);
        requestBody.setWeightModels(weightModels);
        return requestBody;
    }

}