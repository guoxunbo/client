export default class IncomingMaterialDeleteBody{
    
    deleteNote;
    materialLotList;

    constructor(deleteNote, materialLotList){
        this.deleteNote = deleteNote;
        this.materialLotList = materialLotList;
    }
    
    static buliedDelete(deleteNote, materialLotList) {
        return new IncomingMaterialDeleteBody(deleteNote, materialLotList);
    }

}