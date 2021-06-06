
const actionType ={ 
    Issue : "Issue",
    GetMaterialLot : "GetMaterialLot",
}
export default class IssueOrderRequestBody{

    actionType;
    documentId ;
    materialLotIdList;

    constructor(actionType, documentId, materialLotIdList){
        this.actionType =actionType;
        this.documentId = documentId;
        this.materialLotIdList = materialLotIdList;
    }

    static buildGetIssueLotInfo(documentId){
        return new IssueOrderRequestBody(actionType.GetMaterialLot, documentId, undefined);
    }

    static buildIssueLot(documentId, materialLots){
         const materialLotIdList = [];
        materialLots.forEach(mLot => {
            materialLotIdList.push(mLot.materialLotId);
        });
        return new IssueOrderRequestBody(actionType.Issue, documentId, materialLotIdList);
    }
}