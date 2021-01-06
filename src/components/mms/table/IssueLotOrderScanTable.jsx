import IssueOrderRequest from '@api/issue-order-manager/issue-lot-order/IssueOrderRequest';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import { Button, Tag } from 'antd';

export default class IssueLotOrderScanTable extends EntityScanViewTable {

    static displayName = 'IssueLotOrderScanTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createScannedNumber());
        buttons.push(this.createMaterialLotsNumber());
        buttons.push(this.createIssueLotButton());
        return buttons;
    }

    createScannedNumber = () => {
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage("已扫描数量")}：{this.getScanned().length} </Tag>
    }

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
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage("总数")}：{this.state.data.length}</Tag>
    }
  

    createIssueLotButton = () => {
        return <Button key="receive" type="primary" className="table-button" icon="file-excel" onClick={this.IssueLot}>
                        {I18NUtils.getClientMessage('发料')}
                    </Button>
    }

    IssueLot = () => {
        
        let self = this;
        let materialLots = this.getScanned();
        let tableDataSize = this.state.data.length;
        let docId = '';
        if (materialLots.length === 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if (materialLots.length != tableDataSize) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage("请扫描该订单下所有的物料批次号"));
            return;
        }
        if(materialLots){
            docId =materialLots[0].incomingDocId ;
         }
        let requestObject = {
            materialLots: materialLots,
            documentId: docId,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.setState({
                        loading: false
                    });
                    self.props.resetData();
                }
                NoticeUtils.showSuccess();
            }
        }
        IssueOrderRequest.sendIssueLotRequest(requestObject);
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