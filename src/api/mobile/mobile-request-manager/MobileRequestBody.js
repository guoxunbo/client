import MaterialLotAction from "@api/dto/mms/MaterialLotAction";
import PropertyUtils from "@utils/PropertyUtils";

const actionType={
    ReceiveMLot: "receiveMLot",
    StockIn: "stockIn",
    StockInByOrder: "stockInByOrder",
    ValidateStockInByOrder: "validateStockInByOrder",


    StockOut: "stockOut",
    StockOutByOrder: "stockOutByOrder",
    QueryPackageMLot: "queryPackageMLot",
    PackageMLot:"packageMLot",
    QueryShipMLotByDoc: "queryShipMLotByDoc",
    ShipMLot: "shipMLot",
    CheckMLotInventory: "checkMLotInventory",
    PrintMLots: "printMLots",
    TransferInv: "transferInv",
    StockInFinishGood: "stockInFinishGood",
    VailadateTargetWarehouse :"vailadateTargetWarehouse",
    VailadateFromWarehouse:"vailadateFromWarehouse",
    TransferInvMLots:"transferInvMLots",
}
export default class MobileRequestBody {
    
    actionType;
    documentId;
    materialLotAction;
    materialLots;
    packageType;
    materialLotActions;

    constructor(actionType, documentId, materialLotAction, materialLots) {
        this.actionType = actionType;
        this.documentId = documentId;
        this.materialLotAction = materialLotAction;
        this.materialLots = materialLots;
    }

    setPackageType(packageType){
        this.packageType = packageType;
    }
    setMaterialLotActions(materialLotActions){
        this.materialLotActions = materialLotActions;
    }

    static buildReceiveMLot(documentId, materialLotId, qty) {
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(materialLotId)
        materialLotAction.setTransQty(qty);
        return new MobileRequestBody(actionType.ReceiveMLot, documentId, materialLotAction);
    }

    static buildStockIn(materialLotId, storageId) {
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(materialLotId)
        materialLotAction.setTargetStorageId(storageId);
        return new MobileRequestBody(actionType.StockIn, undefined, materialLotAction);
    }

    static buildValidateStockInByOrder(incomingOrderId, materialLots) {
        let requestBody = new MobileRequestBody(actionType.ValidateStockInByOrder, incomingOrderId);
        let materialLotActionList = [];
        materialLots.forEach(mLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(mLot.materialLotId);
            materialLotAction.setTransQty(mLot.currentQty);
            materialLotAction.setTargetStorageId(mLot.targetStorageId);
            //PropertyUtils.copyProperties(mLot, materialLotAction);
            materialLotActionList.push(materialLotAction);
        })
        requestBody.setMaterialLotActions(materialLotActionList);
        return requestBody;
    }
    
    static buildIncomingStockInByOrder(incomingOrderId, materialLots) {
        let requestBody = new MobileRequestBody(actionType.StockInByOrder, incomingOrderId);
        let materialLotActionList = [];
        materialLots.forEach(mLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(mLot.materialLotId)
            materialLotAction.setTargetStorageId(mLot.targetStorageId);
            //PropertyUtils.copyProperties(mLot, materialLotAction);
            materialLotActionList.push(materialLotAction);
        })
        requestBody.setMaterialLotActions(materialLotActionList);
        return requestBody;
    }

    static buildStockInFinishGood(materialLotId, storageId) {
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(materialLotId)
        materialLotAction.setTargetStorageId(storageId);
        return new MobileRequestBody(actionType.StockInFinishGood, undefined, materialLotAction);
    }

    static buildStockOut(materialLotId, storageId) {
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(materialLotId);
        materialLotAction.setFromStorageId(storageId);
        return new MobileRequestBody(actionType.StockOut, undefined, materialLotAction);
    }

    static buildStockOutByOrder(documentId, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId)
            materialLotAction.setFromStorageId(materialLot.lastStorageId);
            materialLotActions.push(materialLotAction);
        });
        let mobileRequestBody = new MobileRequestBody(actionType.StockOutByOrder, documentId);
        mobileRequestBody.setMaterialLotActions(materialLotActions);
        return mobileRequestBody;
    }

    static buildQueryWaitPackageMLot(materialLotId) {
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(materialLotId)
        return new MobileRequestBody(actionType.QueryPackageMLot, undefined, materialLotAction);
    }

    static buildPackageMLot(materialLots, packageType) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId)
            materialLotAction.setTransQty(materialLot.currentQty);
            materialLotActions.push(materialLotAction);
        });
        let mobileRequestBody = new MobileRequestBody(actionType.PackageMLot);
        mobileRequestBody.setPackageType(packageType);
        mobileRequestBody.setMaterialLotActions(materialLotActions);
        return mobileRequestBody;
    }

    static buildShipMLot(documentId, materialLotId) {
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(materialLotId)
        return new MobileRequestBody(actionType.ShipMLot, documentId, materialLotAction);
    }

    static buildCheckMLotInventory(transQty, materialLotId, warehouseId, storageId) {
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(materialLotId)
        materialLotAction.setTransQty(transQty)
        materialLotAction.setFromWarehouseId(warehouseId);
        materialLotAction.setFromStorageId(storageId);
        return new MobileRequestBody(actionType.CheckMLotInventory, undefined, materialLotAction);
    }

    static buildPrintMLots(materialLots) {
        return new MobileRequestBody(actionType.PrintMLots, undefined, undefined, materialLots);
    }

    static buildTransferInv(materialLotId, fromStorageId, targetStorageId) {
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(materialLotId)
        materialLotAction.setFromStorageId(fromStorageId);
        materialLotAction.setTargetStorageId(targetStorageId);
        return new MobileRequestBody(actionType.TransferInv, undefined, materialLotAction);
    }

    static buildVailadateFromWarehouse(materialLotId, fromStorageId) {
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(materialLotId)
        materialLotAction.setFromStorageId(fromStorageId);
        return new MobileRequestBody(actionType.VailadateFromWarehouse, undefined, materialLotAction);
    }
    
    static buildVailadateTargetWarehouse(materialLotId, targetStorageId) {
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(materialLotId)
        materialLotAction.setTargetStorageId(targetStorageId);
        return new MobileRequestBody(actionType.VailadateTargetWarehouse, undefined, materialLotAction);
    }

    static buildTransferInvMLots(data) {
        let materialLotActions = [];
        data.forEach(d =>{
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(d.materialLotId)
            materialLotAction.setFromStorageId(d.fromStorageId);
            materialLotAction.setTargetStorageId(d.targetStorageId);

            materialLotActions.push(materialLotAction);
        })
        let mobileRequestBody = new MobileRequestBody(actionType.TransferInvMLots);
        mobileRequestBody.setMaterialLotActions(materialLotActions);
        return mobileRequestBody;
    }

    
}