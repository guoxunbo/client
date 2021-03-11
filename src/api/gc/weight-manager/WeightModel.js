export default class WeightModel {

    materialLotId;
    weight;
    boxsWeightFlag;
    scanSeq;
    boxsScanSeq;

    constructor(materialLotId, weight, boxsWeightFlag, scanSeq, boxsScanSeq){
        this.materialLotId = materialLotId;
        this.weight = weight;
        this.boxsWeightFlag = boxsWeightFlag;
        this.scanSeq = scanSeq;
        this.boxsScanSeq = boxsScanSeq;
    }

}