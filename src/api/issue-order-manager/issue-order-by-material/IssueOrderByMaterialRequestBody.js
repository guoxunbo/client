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

    constructor(actionType, materials, documentId, materialLotIds){
        this.actionType = actionType;
        this.materials = materials;
        this.documentId = documentId;
        this.materialLotIds = materialLotIds;
    }

    setMaterialLotAction(materialLotAction){
        this.materialLotAction = materialLotAction;
    }

    static buildCreateIssueOrderByMaterial(materials, actionComment){
        let requestBody = new IssueOrderByMaterialRequestBody(ActionType.CreateIssueOrderByMaterial, materials);
        
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setActionComment(actionComment);
        requestBody.setMaterialLotAction(materialLotAction);

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

