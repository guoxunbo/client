export default class MaterialLot {
    objectRrn;
    materialName;
    materialLotId;
    workOrderId;
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

    setWorkOrderId(workOrderId) {
        this.workOrderId = workOrderId;
    }

    setLotId(lotId) {
        this.lotId = lotId;
    }
}