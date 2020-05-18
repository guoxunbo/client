const ActionType = {
    DeleteIncomingMLot: "DeleteIncomingMLot",
    DeleteCOGDetial: "DeleteCOGDetial",
}

export default class IncomingDeleteRequestBody {

    actionType;
    materialLotUnitList;
    lcdCogDetialList;
    deleteNote;

    constructor(actionType, materialLotUnitList, lcdCogDetialList, deleteNote){
        this.actionType = actionType;
        this.materialLotUnitList = materialLotUnitList;
        this.lcdCogDetialList = lcdCogDetialList;
        this.deleteNote = deleteNote;
    }

    static buildDelete(materialLotUnitList, deleteNote) {
        return new IncomingDeleteRequestBody(ActionType.DeleteIncomingMLot, materialLotUnitList, undefined ,deleteNote);
    }

    static buildDeleteCOGDetial(lcdCogDetialList, deleteNote) {
        return new IncomingDeleteRequestBody(ActionType.DeleteCOGDetial, undefined, lcdCogDetialList, deleteNote);
    }
}