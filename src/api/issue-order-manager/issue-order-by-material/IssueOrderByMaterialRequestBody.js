import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

const ActionType = {
    CreateIssueOrderByMaterial: "CreateIssueOrderByMaterial",
    RecommendIssueOrder: "recommendIssueOrder",
    IssueMaterialByOrder: "issueMaterialByOrder",
    GetMaterialStockQty:"getMaterialStockQty",
}

export default class IssueOrderByMaterialRequestBody {

    actionType;
    materials;
    documentId;
    materialLotIds;
    materialLotAction;

    constructor(actionType, materials, documentId, materialLotIds,materialLotAction){
        this.actionType = actionType;
        this.materials = materials;
        this.documentId = documentId;
        this.materialLotIds = materialLotIds;
        this.materialLotAction=materialLotAction;
    }
    static setMaterialLotAction(materialLotAction){
        this.materialLotAction = materialLotAction;
    }
    static buildCreateIssueOrderByMaterial(materials,actionReason,actionComment){
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setActionReason(actionReason);
        materialLotAction.setActionComment(actionComment);
        let requestBody=new IssueOrderByMaterialRequestBody(ActionType.CreateIssueOrderByMaterial, materials,undefined, undefined,materialLotAction);
        return requestBody;
        }

    static buildRecommendIssueMaterial(documentId){

        return new IssueOrderByMaterialRequestBody(ActionType.RecommendIssueOrder, undefined, documentId);
    }

    static buildIssueMaterial(documentId, materialLots){
        let materialLotIds = [];
        materialLots.forEach(mLot => {
            materialLotIds.push(mLot.materialLotId);
        });
        return new IssueOrderByMaterialRequestBody(ActionType.IssueMaterialByOrder, undefined, documentId, materialLotIds);
    }

    static buildGetMaterialStockQty = (materials) => {
        return new IssueOrderByMaterialRequestBody(ActionType.GetMaterialStockQty, materials);
    }
}

