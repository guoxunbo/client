
import QualityCheckTable from '@components/mms/table/QualityCheckTable';
import StockOutCheckRequest from '@api/gc/stock-out-check/StockOutCheckRequest';
import QQCCheckItemDialog from '@components/mms/dialog/QQCCheckItemDialog';

export default class OQCCheckTable extends QualityCheckTable {
   
    createForm = () => {
        return  <QQCCheckItemDialog checkItemList={this.props.checkItemList} ref={this.formRef} object={this.state.data} visible={this.state.formVisible} 
                                            table={this.state.formTable} onOk={this.judgeSuccess} onCancel={this.handleCancel} />
    }

    judgeOk = () => {
        let self = this;
        let object = {
            materialLots : this.state.data,
            success: function(responseBody) {
                self.judgeSuccess();
            }
        }
        StockOutCheckRequest.sendJudgeMaterialLotRequest(object);
    }
    
}


