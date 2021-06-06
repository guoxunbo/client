
const actionType ={ 
    GetWaitIssueMLotByOrderId: "GetWaitIssueMLotByOrderId",
    IssueMLotByDoc: "IssueMLotByDoc",
    PrintIssueOrder: "GetIssueOrderParameter",

    CreateIssueOrderByMLot:"CreateIssueOrderByMLot",
    IssueMaterialLotByOrder:"IssueMaterialLotByOrder",
}
export default class IssueOrderRequestBody{

    actionType;
    documentId ;
    materialLotIdList;
    materialLots;

    constructor(actionType, documentId, materialLotIdList, materialLots){
        this.actionType =actionType;
        this.documentId = documentId;
        this.materialLotIdList = materialLotIdList;
        this.materialLots = materialLots;
    }

    static buildGetWaitMLotByOrder(documentId){
        return new IssueOrderRequestBody(actionType.GetWaitIssueMLotByOrderId, documentId);
    }

    static buildIssueMLotByDoc(documentId, materialLots){
        const materialLotIdList = [];
        materialLots.forEach(mLot => {
            materialLotIdList.push(mLot.materialLotId);
        });
        return new IssueOrderRequestBody(actionType.IssueMLotByDoc, documentId, materialLotIdList);
    }

    static buildGetPrintIssueOrder(documentId){
        return new IssueOrderRequestBody(actionType.PrintIssueOrder, documentId);
    }

    static buildCreateIssueMLotOrder(materialLots){
        return new IssueOrderRequestBody(actionType.CreateIssueOrderByMLot, undefined, undefined, materialLots);
    }

    static buildIssueMaterialLotByOrder(documentId, materialLots){
        const materialLotIdList = [];
        materialLots.forEach(mLot => {
            materialLotIdList.push(mLot.materialLotId);
        });
        return new IssueOrderRequestBody(actionType.IssueMaterialLotByOrder, documentId, materialLotIdList);
    }
}