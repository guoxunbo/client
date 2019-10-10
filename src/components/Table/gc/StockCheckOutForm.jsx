import StockOutCheckRequest from "@api/gc/stock-out-check/StockOutCheckRequest";
import CheckItemForm from "./CheckItemForm";

export default class StockCheckOutForm extends CheckItemForm {
    static displayName = 'StockCheckOutForm';

    judge = () => {
        let self = this;
        let object = {
            materialLots : this.props.object,
            checkList: this.editorColumnTable.state.dataSource,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk();
                }
            }
        }
        StockOutCheckRequest.sendJudgeMaterialLotRequest(object);
    }
}


