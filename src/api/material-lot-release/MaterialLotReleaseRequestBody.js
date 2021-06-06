import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

export default class MaterialLotReleaseRequestBody {

    materialLotHolds;
    materialLotAction;
    
    constructor(materialLotHolds, materialLotAction){
        this.materialLotHolds = materialLotHolds;
        this.materialLotAction = materialLotAction;
    }

    static buildImportReleaseInfo(importTypeNbTable){
        return new MaterialLotReleaseRequestBody(importTypeNbTable);
    }
    
    static buildReleaseMaterialLot(waitReleaseMLotAndAction){
        let materialLotHolds = [];
        waitReleaseMLotAndAction.forEach(waitReleaseMLot => {
            materialLotHolds.push(waitReleaseMLot); 
        });

        let materialLotAction = new MaterialLotAction();
        materialLotAction.setActionReason(waitReleaseMLotAndAction.actionReason);
        materialLotAction.setActionComment(waitReleaseMLotAndAction.actionComment);

        return new MaterialLotReleaseRequestBody(materialLotHolds, materialLotAction);
    }
    
}