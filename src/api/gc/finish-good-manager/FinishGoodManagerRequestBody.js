
const ActionType = {
    COMReceive: "COMReceive",
    WLTReceive: "WLTReceive",
}

export default class FinishGoodManagerRequestBody {
    
    mesPackedLots;
    warehouseRrn;
    actionType;

    constructor(mesPackedLots, warehouseRrn, actionType){
        this.mesPackedLots = mesPackedLots;
        this.warehouseRrn = warehouseRrn;
        this.actionType = actionType;
    }

    /**
     * COM完成品接收
     * @param mesPackedLots 待接收的完成品
     * @param warehouseRrn 仓库
     */
    static buildCOMReceive(mesPackedLots, warehouseRrn) {
        return new FinishGoodManagerRequestBody(mesPackedLots, warehouseRrn, ActionType.COMReceive);
    }

    /**
     * WLT完成品接收
     * @param mesPackedLots 待接收的完成品
     * @param warehouseRrn 仓库
     */
    static buildWLTReceive(mesPackedLots, warehouseRrn) {
        return new FinishGoodManagerRequestBody(mesPackedLots, warehouseRrn, ActionType.WLTReceive, ActionType.WLTReceive);
    }

}

