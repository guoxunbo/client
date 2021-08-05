import MaterialLot from "@api/dto/mms/MaterialLot";
import MaterialLotAction from "@api/dto/mms/MaterialLotAction";
import PropertyUtils from "@utils/PropertyUtils";

const actionType = {
    Picks: "Picks",
    GetStockOutMLotByOrder:"GetStockOutMLotByOrder",
    CheckInventory:"CheckInventory",
    StockOutPartsMLot:"StockOutPartsMLot",
    StockOutPartsMLotByOrder:"StockOutPartsMLotByOrder",

    ReturnPartsWarehouse: "ReturnPartsWarehouse",
    CreateParts2Warehouse: "CreateParts2Warehouse",

}

export default class VcMaterialLotInventoryRequestBody {

    actionType;
    materialLot;
    materialLotActions;
    documentId;
  
    constructor(actionType, materialLot, materialLotActions, documentId){
        this.actionType = actionType;
        this.materialLot = materialLot;
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

    /**
     * 盘点
     * @param {*} materialLots 
     * @returns 
     */
    static checkInventory(materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotAction.setTransQty(materialLot.actualQty)
            materialLotAction.setFromWarehouseRrn(materialLot.lastWarehouseRrn);
            materialLotAction.setFromStorageRrn(materialLot.lastStorageRrn);
            materialLotActions.push(materialLotAction);
        });
        return new VcMaterialLotInventoryRequestBody(actionType.CheckInventory, undefined, materialLotActions);
    }

     /**
     * 备品备件 创建物料批次并入库
     * @param formObject 
     */
    static buildCreateSpareMaterialLot(formObject) {
        let materialLotActions = [];
        let materialLotAction = new MaterialLotAction();
        PropertyUtils.copyProperties(formObject, materialLotAction);
        materialLotActions.push(materialLotAction);

        let materialLot = new MaterialLot();
        PropertyUtils.copyProperties(formObject, materialLot);
        return new VcMaterialLotInventoryRequestBody(actionType.CreateParts2Warehouse, materialLot, materialLotActions);
    }

    static handleStockOutSpareMLot(formObject, action){
        if(actionType.StockOutPartsMLot == action){
            //备件出库
            let materialLotActions = [];
            let materialLotAction = new MaterialLotAction();
            PropertyUtils.copyProperties(formObject, materialLotAction);
            materialLotActions.push(materialLotAction);
        
            let materialLot = new MaterialLot();
            PropertyUtils.copyProperties(formObject, materialLot);
            return new VcMaterialLotInventoryRequestBody(actionType.StockOutPartsMLot, materialLot, materialLotActions, undefined);
        }else if(actionType.StockOutPartsMLotByOrder == action){
            //备件出库 by单据
            let materialLotActions = [];
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setTransQty(formObject.transQty);
            materialLotActions.push(materialLotAction);
        
            let documentId = formObject.docId;
            return new VcMaterialLotInventoryRequestBody(actionType.StockOutPartsMLotByOrder, undefined, materialLotActions, documentId);
        }
    }


    /**
     * 备品备件 退料入库
     * @param {*} formObject 
     * @returns 
     */
     static buildReturnSpareMaterialLot(formObject) {
        let materialLotActions = [];
        let materialLotAction = new MaterialLotAction();
        PropertyUtils.copyProperties(formObject, materialLotAction);
        materialLotActions.push(materialLotAction);

        let materialLot = new MaterialLot();
        PropertyUtils.copyProperties(formObject, materialLot);
        return new VcMaterialLotInventoryRequestBody(actionType.ReturnPartsWarehouse, materialLot, materialLotActions);
    }
}
export {actionType};