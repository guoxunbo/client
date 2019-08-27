export default class MaterialLotAction {
    
    materialLotId;
    transQty;
    fromWarehouseRrn;
    targetWarehouseRrn;
    targetStorageRrn;
    actionCode;
    actionReason;
    actionComment;
   
    setMaterialLotId(materialLotId) {
        this.materialLotId = materialLotId;
    }

    setTransQty(transQty) {
        this.transQty = transQty;
    }
    
    setTargetStorageRrn(targetStorageRrn) {
        this.targetStorageRrn = targetStorageRrn;
    }

    setFromWarehouseRrn(fromWarehouseRrn) {
        this.fromWarehouseRrn = fromWarehouseRrn;
    }

    setTargetWarehouseRrn(targetWarehouseRrn) {
        this.targetWarehouseRrn = targetWarehouseRrn;
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