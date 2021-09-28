import MaterialLot from "@api/dto/mms/MaterialLot";
import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

const ActionType = {
    ScrapMLotByOrder:"ScrapMLotByOrder",
    GetReservedMLot: "GetReservedMLot",
    ValidateReservedMLot: "ValidateReservedMLot",
}
export default class ScrapMLotRequestBody {

    actionType;
    documentId;
    materialLotList;

    constructor(actionType, documentId, materialLotList){
        this.actionType =actionType;
        this.documentId = documentId;
        this.materialLotList = materialLotList;
    }

    /**
     * 
     * @param {*} docId 单据号 
     * @param {*} materialLots  
     * @returns 
     */
    static buildScrapMLotByOrder(documentId, materialLots){
        return new ScrapMLotRequestBody(ActionType.ScrapMLotByOrder, documentId, materialLots);
    }

    /**
     * 
     * @param {*} documentLindId 子单号
     * @returns 
     */
    static buildGetReservedMLot(documentLindId){
        return new ScrapMLotRequestBody(ActionType.GetReservedMLot, documentLindId);
    }

    /**
     * 
     * @param {*} docId 单据号
     * @param {*} materialLotId 批次号
     * @returns 
     */
    static buildValidateReservedMLot(docId, materialLotId){
        let materialLots = [];
        let materialLot = new MaterialLot()
        materialLot.setMaterialLotId(materialLotId)
        materialLots.push(materialLot)
        return new ScrapMLotRequestBody(ActionType.ValidateReservedMLot, docId, materialLots);
    }
}