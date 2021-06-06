const ActionType = {
    Merge:"merge",
}

export default class ProductManagerRequestBody {

    actionType;
    dataList;

    constructor(actionType, dataList){
        this.actionType = actionType;
        this.dataList = dataList;
    }

    static buildMergeProduct(product) {
        let dataList = []
        dataList.push(product);
        return new ProductManagerRequestBody(ActionType.Merge, dataList);
    }
}

