import IssueOrderRequest from '@api/issue-order-manager/issue-lot-order/IssueOrderRequest';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import { Button, Tag } from 'antd';

/**
 * 发往mes的发料(主材 辅材 成品)通用
 */
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
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage(i18NCode.ScannedQty)}：{this.getScanedRows().length} </Tag>
    }

    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage(i18NCode.Qty)}：{this.state.data.length}</Tag>
    }
  

    createIssueLotButton = () => {
        return <Button key="receive" type="primary" className="table-button" icon="file-excel" onClick={this.IssueLot}>
                        {I18NUtils.getClientMessage(i18NCode.Issue)}
                    </Button>
    }

    IssueLot = () => {
        let self = this;
        let materialLots = this.getScanedRows();
        let doc = this.props.orderTable.getSingleSelectedRow();
        if (materialLots.length === 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        self.setState({loading: true});
        let requestObject = {
            materialLots: materialLots,
            documentId:  doc.name,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.setState({
                        loading: false
                    });
                    self.props.resetData();
                    self.props.onSearch();
                }
                NoticeUtils.showSuccess();
            },
            fail: function () {
                self.setState({
                    loading: false
                });
            }
        }
        IssueOrderRequest.sendIssueMLotByDocRequest(requestObject);
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