import IssueMaterialOrderRequest from '@api/issue-order-manager/issue-material-order/IssueMaterialOrderRequest';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import OrderTable from '@components/gc/table/OrderTable';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import { Button, Tag } from 'antd';

export default class IssueMaterialOrderScanTable extends EntityScanViewTable {

    static displayName = 'IssueMaterialOrderScanTable';

    getRowClassName = (record, index) => {
        if (record.errorFlag) {
            return 'error-row';
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
        buttons.push(this.createErrorNumber());
        buttons.push(this.createScannedTotalQty());
        buttons.push(this.createMaterialLotsNumber());
        buttons.push(this.createIssueLotButton());
        return buttons;
    }
    createErrorNumber = () =>{
        return <Tag color="#FF0000" style={styles.tableButton} >{I18NUtils.getClientMessage("异常笔数")}：{this.getErrorMaterialLot().length} </Tag>
    }

    createScannedTotalQty = () =>{
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage(i18NCode.ScannedTotalQty)}：{this.getScannedTotalQty()} </Tag>
    }

    getScannedTotalQty = () => {
        let datas = this.state.data ;
        let totalQty = 0;
        if(datas){
            datas.forEach(data => {
                if(data.status == 'Wait'){
                    totalQty += data.currentQty;
                }
            })
        }
        return totalQty ;
    }

    getErrorMaterialLot = () => {
        let datas = this.state.data ;
        let errorMaterialLot = [];
        if(datas){
            datas.forEach(data => {
                if(data.errorFlag){
                    errorMaterialLot.push(data)
                }
            })
        }
        return errorMaterialLot ;
    }

    getScanned = () => {
        let datas = this.state.data ;
        let scanned = [];
        if(datas){
            datas.forEach(data => {
                if(data.status == 'Wait'){
                    scanned.push(data) ;
                }
            })
        }
        return scanned ;
    }

    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage(i18NCode.Qty)}：{this.state.data.length}</Tag>
    }
  

    createIssueLotButton = () => {
        return <Button key="receive" type="primary" className="table-button" icon="file-excel" onClick={this.IssueMaterial}>
                        {I18NUtils.getClientMessage(i18NCode.Issue)}
                    </Button>
    }

    IssueMaterial = () => {
        let self = this;
        let errorNumber = self.getErrorMaterialLot().length;
        if(errorNumber > 0){
            NoticeUtils.showNotice(I18NUtils.getClientMessage("异常笔数大于0"));
            return;
        }
        let materialLots = self.getScanned();
        let TotalQty =  self.getScannedTotalQty();
        let docLine = self.props.orderTable.getSingleSelectedRow();
        if (materialLots.length == 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if  (docLine.qty < TotalQty){
            NoticeUtils.showNotice(I18NUtils.getClientMessage("数量错误"));
            return;
        }
        let requestObject = {
            materialLots: materialLots,
            documentLine: docLine,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.setState({
                        loading: false
                    });
                    self.props.resetData();
                    self.props.onSearch();

                }
                NoticeUtils.showSuccess();
            }
        }
        IssueMaterialOrderRequest.sendIssueMaterialRequest(requestObject);
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