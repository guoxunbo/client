import IssueOrderRequest from '@api/issue-order-manager/issue-lot-order/IssueOrderRequest';
import EntityListTable from '@components/framework/table/EntityListTable';

/**
 * 发往mes的发料(主材 辅材 成品)通用
 */
export default class IssueLotOrderTable extends EntityListTable {

    static displayName = 'IssueLotOrderTable';

    createButtonGroup = () => {
      
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

     /**
     * 行点击事件
     */
    selectRow = (record) => {
        let self = this;
        let selectedRows = [];
        let showData = [];
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        let object = {
            documentId: record.name,
            success: function(responseBody) {
                showData = responseBody.materialLotList;
                
                self.props.issueLotScanProperties.setState({tableData: showData})
            }
        }
        IssueOrderRequest.sendGetWaitMLotByOrderRequest(object);
    }

    /**
     * 接收数据不具备可删除等操作
     */
    buildOperationColumn = () => {
        
    }

}
