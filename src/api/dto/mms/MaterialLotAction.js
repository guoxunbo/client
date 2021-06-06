export default class MaterialLotAction {
    
    materialLotId;
    transQty;
    fromWarehouseRrn;
    fromWarehouseId;

    fromStorageRrn;
    fromStorageId;

    targetWarehouseRrn;
    targetWarehouseId;

    targetStorageRrn;
    targetStorageId;
    
    actionCode;
    actionReason;
    actionComment;
   
    setMaterialLotId(materialLotId) {
        this.materialLotId = materialLotId;
    }

    setTransQty(transQty) {
        this.transQty = transQty;
    }
    
    setTargetWarehouseRrn(targetWarehouseRrn) {
        this.targetWarehouseRrn = targetWarehouseRrn;
    }

    setTargetWarehouseId(targetWarehouseId) {
        this.targetWarehouseId = targetWarehouseId;
    }

    setTargetStorageRrn(targetStorageRrn) {
        this.targetStorageRrn = targetStorageRrn;
    }

    setFromWarehouseRrn(fromWarehouseRrn) {
        this.fromWarehouseRrn = fromWarehouseRrn;
    }

    setFromWarehouseId(fromWarehouseId){
        this.fromWarehouseId = fromWarehouseId;
    }

    setFromStorageRrn(fromStorageRrn) {
        this.fromStorageRrn = fromStorageRrn;
    }

    setFromStorageId(fromStorageId) {
        this.fromStorageId = fromStorageId;
    }
 
    setActionCode(actionCode) {
        this.actionCode = actionCode;
    }

    setActionReason(actionReason) {
        this.actionReason = actionReason;
    }

    setActionComment(actionComment) {
        this.actionComment = actionComment;
    }
}