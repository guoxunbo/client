const ActionType = {
    DeleteIncomingMLot: "DeleteIncomingMLot",
    DeleteCOGDetial: "DeleteCOGDetial",
    DeleteCOGEcretive: "DeleteCOGEcretive",
}

export default class IncomingDeleteRequestBody {

    actionType;
    materialLotUnitList;
    lcdCogDetialList;
    deleteNote;
    lcdCogEcretiveList;

    constructor(actionType, materialLotUnitList, lcdCogDetialList, lcdCogEcretiveList, deleteNote){
        this.actionType = actionType;
        this.materialLotUnitList = materialLotUnitList;
        this.lcdCogDetialList = lcdCogDetialList;
        this.lcdCogEcretiveList = lcdCogEcretiveList;
        this.deleteNote = deleteNote;
    }

    static buildDelete(materialLotUnitList, deleteNote) {
        return new IncomingDeleteRequestBody(ActionType.DeleteIncomingMLot, materialLotUnitList, undefined, undefined ,deleteNote);
    }

    static buildDeleteCOGDetial(lcdCogDetialList, deleteNote) {
        return new IncomingDeleteRequestBody(ActionType.DeleteCOGDetial, undefined, lcdCogDetialList, undefined, deleteNote);
    }

    static buildDeleteCOGEcretive(lcdCogEcretiveList, deleteNote) {
        return new IncomingDeleteRequestBody(ActionType.DeleteCOGEcretive, undefined, undefined, lcdCogEcretiveList, deleteNote);
    }
}