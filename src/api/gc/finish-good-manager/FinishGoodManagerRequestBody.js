
export default class FinishGoodManagerRequestBody {

    mesPackedLots;
    warehouseRrn;

    constructor(mesPackedLots, warehouseRrn){
        this.mesPackedLots = mesPackedLots;
        this.warehouseRrn = warehouseRrn;
    }

    /**
     * 完成品接收
     * @param mesPackedLots 待接收的完成品
     * @param warehouseRrn 仓库
     */
    static buildReceive(mesPackedLots, warehouseRrn) {
        return new FinishGoodManagerRequestBody(mesPackedLots, warehouseRrn);
    }

}

