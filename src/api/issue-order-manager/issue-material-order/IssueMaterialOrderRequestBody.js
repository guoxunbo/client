
const actionType ={ 
    Issue : "Issue",
    GetMaterialLot : "GetMaterialLot",
    Validation : "Validation",
}
export default class IssueMaterialOrderRequestBody{

    actionType;
    documentLine ;
    materialLotIdList;

    constructor(actionType, documentLine, materialLotIdList){
        this.actionType =actionType;
        this.documentLine = documentLine;
        this.materialLotIdList = materialLotIdList;
    }

    static buildGetIssueMaterialInfo(documentLine){
        return new IssueMaterialOrderRequestBody(actionType.GetMaterialLot, documentLine, undefined);
    }

    static buildIssueMaterial(documentLine, materialLots){        
        let materialLotIdList = [];
        materialLots.forEach(mLot => {
            materialLotIdList.push(mLot.materialLotId);
        });
        return new IssueMaterialOrderRequestBody(actionType.Issue, documentLine, materialLotIdList);
    }

    static buildValidation(documentLine, materialLotId){
        let materialLotIdList = [];
        materialLotIdList.push(materialLotId);
        return new IssueMaterialOrderRequestBody(actionType.Validation, documentLine, materialLotIdList);
    }
}