import { Button } from "@alifd/next";
import VcStockOutRequest from "@api/vc/stock-out-manager/VcStockOutRequest";
import EntityScanViewTable from "@components/framework/table/EntityScanViewTable";
import { i18Messages, i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import IconUtils from "@utils/IconUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Tag } from "antd";


export default class VcStockOutScanTable extends EntityScanViewTable {

    static displayName = 'VcStockOutScanTable';

    getRowClassName = (record, index) => {
        if(record.rowClass){
            return 'ban-row';
        }else if(record.scaned) {
            return 'scaned-row';
        }else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createScannedNumber());
        buttons.push(this.createMaterialLotsNumber());
        buttons.push(this.createStockOutbutton());
        return buttons;
    }

    createScannedNumber = () => {
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage(i18NCode.ScannedQty)}：{this.getScanned().length} </Tag>
    }

    //已经扫描的materialLot
    getScanned = () => {
        let datas = this.state.data ;
        let scanned = [];
        if(datas){
            datas.forEach(data => {
                if(data.scaned){
                    scanned.push(data) ;
                }
            })
        }
        return scanned ;
    }

    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage(i18NCode.Qty)}：{this.state.data.length}</Tag>
    }

    createStockOutbutton = () => {
        return <Button key="stockOut" type="primary" className="table-button" onClick={this.StockOut}>
                        {IconUtils.buildIcon("file-excel")} {I18NUtils.getClientMessage(i18NCode.BtnShip)}
                    </Button>
    }

    StockOut = () => {
        let self = this;
        let materialLots = this.getScanned();
        let documentLine = this.props.deliverOrderTable.getSingleSelectedRow();
        let requestObject = {
            materialLots: materialLots,
            docLineId:  documentLine.lineId,
            success: function(responseBody) {
                self.setState({
                    loading: false
                });
                self.props.resetData();
                self.props.onSearch();
                NoticeUtils.showSuccess();
            }
        }
       VcStockOutRequest.sendStockOutRequest(requestObject);
    }


    buildOperationColumn = () => {
        
    }
}
const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};