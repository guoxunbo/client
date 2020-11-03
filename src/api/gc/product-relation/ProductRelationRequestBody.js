const ActionType = {
    SaveProductNumberRelation: "SaveProductNumberRelation",
    UpdateProductNumberRelation: "UpdateProductNumberRelation",
};

export default class ProductRelationRequestBody {

    actionType;
    productNumberRelation;

    constructor(actionType, productNumberRelation){
        this.actionType = actionType;
        this.productNumberRelation = productNumberRelation;
    }

    static buildMergeProductNumberRelation(productNumberRelation) {
        let actionType = ActionType.UpdateProductNumberRelation;
        if(productNumberRelation.objectRrn == undefined){
            actionType = ActionType.SaveProductNumberRelation;
        }
        return new ProductRelationRequestBody(actionType, productNumberRelation);
    }

}

