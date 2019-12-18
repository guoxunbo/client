import WeightModel from "./WeightModel";


const ActionType = {
    Query: "Query",
    Weight: "Weight",
} 

export default class WeightManagerRequestBody {

    actionType;
    materialLotId;
    weightModels;

    constructor(actionType,materialLotId){
        this.actionType = actionType;
        this.materialLotId = materialLotId;
    }

    setWeightModels (weightModels) {
        this.weightModels = weightModels;
    }

    static buildQuery(materialLotId) {
        return new WeightManagerRequestBody(ActionType.Query, materialLotId);
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