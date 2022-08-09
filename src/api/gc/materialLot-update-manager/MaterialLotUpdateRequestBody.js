const ActionType = {
    UpdateTreasuryNote: "UpdateTreasuryNote",
    Query: "Query",
    UpdateLocation: "UpdateLocation",
    HoldMaterialLot: "HoldMLot",
    ReleaseMaterialLot: "ReleaseMLot",
    QueryReferenceList: "QueryReferenceList",
    ImportQueryMLot: "ImportQueryMLot",
    ImportQueryMLotUnit: "ImportQueryMLotUnit",
    UpdateLotInfo: "UpdateLotInfo",
    RwImportQueryMLot: "RwImportQueryMLot",
    UpdateMRBComments: "UpdateMRBComments",
    SaveShipHis: "SaveShipHis",
    ExpCobData: "ExpCobData",
    ExpCobUnitData: "ExpCobUnitData",
    ExpCobPreviewData: "ExpCobPreviewData",
}

export default class MaterialLotUpdateRequestBody {

    treasuryeNote;
    materialLotList;
    materialLotId
    location;
    reason;
    remarks;
    referenceName;
    materialLot;

    constructor(actionType, treasuryeNote, materialLotList, materialLotId, location, reason, remarks, referenceName){
        this.actionType = actionType;
        this.treasuryeNote = treasuryeNote;
        this.materialLotList = materialLotList;
        this.materialLotId = materialLotId;
        this.location = location;
        this.reason = reason;
        this.remarks = remarks;
        this.referenceName = referenceName;
    }

    static buildUpdateMRBCommentsInfo(materialLotList, mrbComments) {
        let body = new MaterialLotUpdateRequestBody(ActionType.UpdateMRBComments);
        body.materialLotList = materialLotList;
        body.mrbComments = mrbComments;
        return body;
    }

    static buildUpdateInfo(treasuryeNote, materialLotList) {
        return new MaterialLotUpdateRequestBody(ActionType.UpdateTreasuryNote, treasuryeNote, materialLotList);
    }

    static buildSaveShipHisInfo(materialLotList) {
        return new MaterialLotUpdateRequestBody(ActionType.SaveShipHis, undefined, materialLotList);
    }

    static buildQuery(materialLotId) {
        return new MaterialLotUpdateRequestBody(ActionType.Query, undefined, undefined, materialLotId);
    }

    static buildUpdateLocationInfo(location, materialLotList, remarks) {
        return new MaterialLotUpdateRequestBody(ActionType.UpdateLocation, undefined, materialLotList, undefined, location, undefined, remarks);
    }

    static buildHoldInfo(materialLotList, reason, remarks, holdType) {
        let body = new MaterialLotUpdateRequestBody(ActionType.HoldMaterialLot);
        body.materialLotList = materialLotList;
        body.reason = reason;
        body.remarks = remarks;
        body.holdType = holdType;
        return body;
    }
    
    static buildReleaseInfo(materialLotList, reason, remarks) {
        return new MaterialLotUpdateRequestBody(ActionType.ReleaseMaterialLot, undefined, materialLotList, undefined, undefined, reason, remarks);
    }

    static buildGetReferenceList(referenceName) {
        return new MaterialLotUpdateRequestBody(ActionType.QueryReferenceList, undefined, undefined, undefined, undefined, undefined, undefined, referenceName);
    }

    static buildUpdateMLotInfo(materialLot) {
        let body = new MaterialLotUpdateRequestBody(ActionType.UpdateLotInfo);
        body.materialLot = materialLot;
        return body;
    }

    static buildImportSearch(tableRrn) {
        let body = new MaterialLotUpdateRequestBody(ActionType.ImportQueryMLot);
        body.tableRrn = tableRrn;
        return body;
    }

    static buildRwImportSearch(tableRrn) {
        let body = new MaterialLotUpdateRequestBody(ActionType.RwImportQueryMLot);
        body.tableRrn = tableRrn;
        return body;
    }

    static buildMLotUnitImportSearch(tableRrn) {
        let body = new MaterialLotUpdateRequestBody(ActionType.ImportQueryMLotUnit);
        body.tableRrn = tableRrn;
        return body;
    }

    static buildExport(tableName, materialLotList) {
        let body = new MaterialLotUpdateRequestBody(ActionType.ExpCobData);
        body.tableName = tableName;
        body.materialLotList = materialLotList;
        return body;
    }

    static buildPreviewExport(tableName, materialLotList) {
        let body = new MaterialLotUpdateRequestBody(ActionType.ExpCobPreviewData);
        body.tableName = tableName;
        body.materialLotList = materialLotList;
        return body;
    }
    
    static buildCobUnitExport(tableName, materialLotUnitList) {
        let body = new MaterialLotUpdateRequestBody(ActionType.ExpCobUnitData);
        body.tableName = tableName;
        body.materialLotUnitList = materialLotUnitList;
        return body;
    }
}