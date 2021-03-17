import VcFinishGoodRequest from "@api/vc/finishGood-manager/VcFinishGoodRequest";
import EntityScanViewTable from "@components/framework/table/EntityScanViewTable";
import { i18Messages, i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Button, Tag } from "antd";

/**
 * vc成品接收
 */
export default class VcFinishGoodScanTable extends EntityScanViewTable {

    static displayName = 'VcFinishGoodScanTable';

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
        buttons.push(this.createFinishGoodReceiveButton());
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
  

    createFinishGoodReceiveButton = () => {
        return <Button key="receive" type="primary" className="table-button" icon="file-excel" onClick={this.Receive}>
                        {I18NUtils.getClientMessage(i18NCode.BtnReceive)}
                    </Button>
    }

    Receive = () => {
        let self = this;
        let materialLot = this.getScanned();
        let doc = this.props.orderTable.getSingleSelectedRow();
        let requestObject = {
            materialLots: materialLot,
            documentId:  doc.name,
            success: function(responseBody) {
                self.setState({
                    loading: false
                });
                self.props.resetData();
                self.props.onSearch();
                NoticeUtils.showSuccess();
            }
        }
       VcFinishGoodRequest.sendFinishGoodReceiveRequest(requestObject);
    }
     /**
     * 接收数据不具备可删除等操作
     */
    buildOperationColumn = () => {
        
    }
    
}
const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};