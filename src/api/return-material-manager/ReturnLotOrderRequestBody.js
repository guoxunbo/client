const actionType ={ 
    ReturnLot : "ReturnMLot",
    GetMaterialLot : "GetMaterialLot",
}
export default class ReturnLotOrderRequestBody{

    actionType;
    documentId ;
    materialLotIdList;

    constructor(actionType, documentId, materialLotIdList){
        this.actionType =actionType;
        this.documentId = documentId;
        this.materialLotIdList = materialLotIdList;
    }

    static buildGetReturnLotInfo(documentId){
        return new ReturnLotOrderRequestBody(actionType.GetMaterialLot, documentId, undefined);
    }

    static buildReturnLot(documentId, materialLots){
         const materialLotIdList = [];
        materialLots.forEach(mLot => {
            materialLotIdList.push(mLot.materialLotId);
        });
        return new ReturnLotOrderRequestBody(actionType.ReturnLot, documentId, materialLotIdList);
    }

}