export default class StockInModel {

    materialLotId;
    relaxBoxId;
    storageId;

    constructor(materialLotId, relaxBoxId, storageId){
        this.materialLotId = materialLotId;
        this.relaxBoxId = relaxBoxId;
        this.storageId = storageId;
    }

}