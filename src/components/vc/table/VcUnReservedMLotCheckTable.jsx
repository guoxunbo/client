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
        let selectMLots = self.getSelectedRows();
        if(!selectMLots){
            return;
        }
        //当前需卡控批次状态是否入库。
        //卡控取消包装。
        let mLots = selectMLots.filter(mLot => mLot.boxMaterialLotId != undefined);
        if(mLots.length > 0 ){
            NoticeUtils.showNotice(I18NUtils.getClientMessage("请先取消包装") + "："+ mLots[0].boxMaterialLotId);
            return
        }

        let invMLots = selectMLots.filter(mLot => mLot.status != "In");
        if(invMLots.length > 0 ){
            NoticeUtils.showNotice(I18NUtils.getClientMessage("请先上架") + "：" + mLots[0].materialLotId);
            return
        }        
        let unReservedNote = this.input.state.value;
        let object ={
            materialLotList: selectMLots,
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