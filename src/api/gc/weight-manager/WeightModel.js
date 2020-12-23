export default class WeightModel {

    materialLotId;
    weight;
    boxsWeightFlag;
    scanSeq;

    constructor(materialLotId, weight, boxsWeightFlag, scanSeq){
        this.materialLotId = materialLotId;
        this.weight = weight;
        this.boxsWeightFlag = boxsWeightFlag;
        this.scanSeq = scanSeq;
    }

}