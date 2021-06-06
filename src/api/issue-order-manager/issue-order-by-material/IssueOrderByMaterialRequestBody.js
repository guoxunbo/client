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
    materialLotIds

    constructor(actionType, materials, documentId, materialLotIds){
        this.actionType = actionType;
        this.materials = materials;
        this.documentId = documentId;
        this.materialLotIds = materialLotIds;
    }

    static buildCreateIssueOrderByMaterial(materials){

        return new IssueOrderByMaterialRequestBody(ActionType.CreateIssueOrderByMaterial, materials);
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

