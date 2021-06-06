const ActionType = {
    Merge: "merge",
}

export default class RawMaterialManagerRequestBody {

    actionType;
    dataList;

    constructor(actionType, dataList){
        this.actionType = actionType;
        this.dataList = dataList;
    }

    static buildMergeRawMaterial(rawMaterial) {
        let dataList = []
        dataList.push(rawMaterial);
        return new RawMaterialManagerRequestBody(ActionType.Merge, dataList);
    }
}

