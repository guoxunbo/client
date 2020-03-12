
export default class IncomingDeleteRequestBody {

    materialLotUnitList;
    deleteNote;

    constructor(materialLotUnitList, deleteNote){
        this.materialLotUnitList = materialLotUnitList;
        this.deleteNote = deleteNote;
    }

    static buildDelete(materialLotUnitList, deleteNote) {
        return new IncomingDeleteRequestBody(materialLotUnitList, deleteNote);
    }
}