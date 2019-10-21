import QualityCheckItemDialog from "@components/mms/dialog/QualityCheckItemDialog";
import StockOutCheckRequest from "@api/gc/stock-out-check/StockOutCheckRequest";

export default class QQCCheckItemDialog extends QualityCheckItemDialog {
    static displayName = 'QQCCheckItemDialog';

    judge = () => {
        //表格数据
        let tableData = this.props.object;
        let checkList =  this.entityForm.editorColumnTable.state.dataSource;
        let self = this;
        let object = {
            materialLots : tableData,
            checkList: checkList,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk();
                }
            }
        }
        StockOutCheckRequest.sendJudgeMaterialLotRequest(object);
    }


}

