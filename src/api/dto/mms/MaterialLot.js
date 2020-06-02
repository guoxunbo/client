export default class MaterialLot {
    objectRrn;
    materialName;
    materialLotId;
    lotId;

    setObjectRrn(objectRrn) {
        this.objectRrn = objectRrn;
    }
    
    setMaterialName(materialName) {
        this.materialName = materialName;
    }

    setMaterialLotId(materialLotId) {
        this.materialLotId = materialLotId;
    }

    setLotId(lotId) {
        this.lotId = lotId;
    }
}