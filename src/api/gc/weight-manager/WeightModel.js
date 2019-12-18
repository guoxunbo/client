export default class WeightModel {

    materialLotId;
    weight;
    boxsWeightFlag;

    constructor(materialLotId, weight, boxsWeightFlag){
        this.materialLotId = materialLotId;
        this.weight = weight;
        this.boxsWeightFlag = boxsWeightFlag;
    }

}