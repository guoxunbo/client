import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

const actionType = {
    Picks: "Picks",
    GetStockOutMLotByOrder:"GetStockOutMLotByOrder"
}

export default class VcMaterialLotInventoryRequestBody {

    actionType;
    document;
    materialLotActions;
    documentId;
  
    constructor(actionType, document, materialLotActions, documentId){
        this.actionType = actionType;
        this.document = document;
        this.materialLotActions = materialLotActions;
        this.documentId = documentId;
    }

    /**
     * 领料,可以批量领料
     */
    static buildPick(materialLots) {
        let materialLotActions = [];
        materialLots.forEach(mlot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(mlot.materialLotId);
            materialLotAction.setFromWarehouseRrn(mlot.lastWarehouseRrn);
            materialLotAction.setFromStorageRrn(mlot.lastStorageRrn);
            materialLotAction.setTransQty(mlot.currentQty);
            materialLotActions.push(materialLotAction);
        });
        return new VcMaterialLotInventoryRequestBody(actionType.Picks, undefined, materialLotActions);
    }
    
    static buildGetStockOutMLotByOrder(documentId) {
        return new VcMaterialLotInventoryRequestBody(actionType.GetStockOutMLotByOrder, undefined, undefined, documentId);
    }

}