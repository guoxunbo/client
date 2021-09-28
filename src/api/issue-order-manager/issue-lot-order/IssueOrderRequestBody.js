import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

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
    materialLotAction;

    constructor(actionType, documentId, materialLotIdList, materialLots){
        this.actionType =actionType;
        this.documentId = documentId;
        this.materialLotIdList = materialLotIdList;
        this.materialLots = materialLots;
    }

    setMaterialLotAction(materialLotAction){
        this.materialLotAction = materialLotAction;
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

    static buildCreateIssueMLotOrder(materialLots, actionComment){
        let requestBody = new IssueOrderRequestBody(actionType.CreateIssueOrderByMLot, undefined, undefined, materialLots);
        
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setActionComment(actionComment);
        requestBody.setMaterialLotAction(materialLotAction);

        return requestBody
    }

    static buildIssueMaterialLotByOrder(documentId, materialLots){
        const materialLotIdList = [];
        materialLots.forEach(mLot => {
            materialLotIdList.push(mLot.materialLotId);
        });
        return new IssueOrderRequestBody(actionType.IssueMaterialLotByOrder, documentId, materialLotIdList);
    }
}