
import MaterialLotSplitRequest from '@api/material-lot-split/MaterialLotSplitRequest';
import EntityListTable from '@components/framework/table/EntityListTable';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import IconUtils from '@utils/IconUtils';
import NoticeUtils from '@utils/NoticeUtils';
import { Button, Input } from 'antd';

export default class SplitMaterialLotTable extends EntityListTable {

    static displayName = 'SplitMaterialLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createSplitQty());
        buttons.push(this.createSplitRemarK());
        buttons.push(this.createSplitButton());
        return buttons;
    }

    createSplitQty = () => {
        return <div style={styles.input}>
            <Input ref={(splitQtyInput) => { this.splitQtyInput = splitQtyInput }} key="splitQtyInput" placeholder={I18NUtils.getClientMessage(i18NCode.SplitQty)} />
        </div>
    }

    createSplitRemarK = () => {
        return <div style={styles.input}>
            <Input ref={(splitRemark) => { this.splitRemark = splitRemark }} key="splitRemark" placeholder={I18NUtils.getClientMessage(i18NCode.BtnRemark)} />
        </div>
    }

    createSplitButton =()=>{
        return <Button key="split" type="primary" className="table-button" onClick={this.split}>
                        {IconUtils.buildIcon("file-excel")} {I18NUtils.getClientMessage(i18NCode.BtnSplit)}
                    </Button>
    }

    split=()=>{
        let self = this;
        let selectRowData = self.getSingleSelectedRow();
        if(selectRowData == undefined){
            return
        }
        let splitQty = self.splitQtyInput.state.value;
        let remark = self.splitRemark.state.value;
        if(splitQty == undefined || isNaN(splitQty)){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.PleaseInputTrueQty));
            return
        }
        let showData = self.state.data;
        let requestObject = {
            materialLot: selectRowData,
            splitQty: splitQty,
            remark: remark,
            success: function(responseBody) {
                let materialLot = responseBody.materialLot;
                selectRowData.currentQty = selectRowData.currentQty - materialLot.currentQty;
                showData.unshift(materialLot);
                self.splitQtyInput.setState({
                    value: [],
                })
                self.splitRemark.setState({
                    value: [],
                })
                self.setState({
                    data: showData,
                });
                NoticeUtils.showSuccess();
            }
        }
        MaterialLotSplitRequest.sendSplitMaterialLot(requestObject);
    }

    getRowClassName = (record, index) => {
        const {selectedRows} = this.state;
        if (selectedRows.indexOf(record) >= 0) {
            return 'scaned-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };
}
const styles = {
    input:{
        width: 200,
        marginLeft : '10px'
    },
};


