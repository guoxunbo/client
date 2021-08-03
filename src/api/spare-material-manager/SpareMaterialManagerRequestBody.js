import MaterialLotAction from "@api/dto/mms/MaterialLotAction";
import PropertyUtils from "@utils/PropertyUtils";

const ActionType = {
    Merge: "MergeParts",
}

export default class SpareMaterialManagerRequestBody {

    actionType;
    dataList;
    materialLotAction;
    materialLot;

    constructor(actionType, dataList, materialLotAction, materialLot){
        this.actionType = actionType;
        this.dataList = dataList;
        this.materialLotAction = materialLotAction;
        this.materialLot = materialLot;
    }

    static buildMergeMaterial(spareMaterial) {
        let dataList = []
        dataList.push(spareMaterial);
        return new SpareMaterialManagerRequestBody(ActionType.Merge, dataList);
    }
 
    static buildImportMaterial(dataList) {
        return new SpareMaterialManagerRequestBody(ActionType.Merge, dataList);
    }

    // static buildReceiveSpareMaterialLot(formObject) {
    //     let materialLotAction = new MaterialLotAction();
    //     PropertyUtils.copyProperties(formObject, materialLotAction);

    //     let materialLot = new MaterialLot();
    //     PropertyUtils.copyProperties(formObject, materialLot);
    //     return new SpareMaterialManagerRequestBody(ActionType.Receive, undefined, materialLotAction, materialLot);
    // }

}

