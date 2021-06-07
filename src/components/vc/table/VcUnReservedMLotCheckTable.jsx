import VcFinishGoodReservedRequest from "@api/vc/finishGood-manager/reserved/VcFinishGoodReservedRequest";
import EntityListCheckTable from "@components/framework/table/EntityListCheckTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Button, Input, Tag } from "antd";

/**
 * 取消备货
 */
export default class VcUnReservedMLotCheckTable extends EntityListCheckTable {

    static displayName = 'VcUnReservedMLotCheckTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createUnReservedRemarkInput());
        buttons.push(this.createUnReserved());
        return buttons;
    }
    createUnReservedRemarkInput =()=>{
        return  <div style={styles.input}>
                    <Input ref={(input) => { this.input = input }} key="unReservedNote" placeholder={I18NUtils.getClientMessage(i18NCode.BtnRemark)} />
                </div>
    }

    createUnReserved = () => {
        return <Button key="unReserved" type="primary" className="table-button" icon="file-excel" onClick={this.unReserved}>
                        {I18NUtils.getClientMessage(i18NCode.BtnUnReserved)}
                    </Button>
    }

    unReserved =()=>{
        let self = this;
        let selectMlot = self.getSelectedRows();
        if(!selectMlot){
            return;
        }
        let unReservedNote = this.input.state.value;
        let object ={
            materialLotList: selectMlot,
            remake: unReservedNote,
            success: function(responseBody) {
                self.props.resetData();
                NoticeUtils.showSuccess();
            }
        }
        VcFinishGoodReservedRequest.sentUnReserved(object);
    }

    //无操作列
    buildOperationColumn() {

    }
  
}
const styles = {
    input: {
        width: 200,
    },
};