import IssueOrderRequest from '@api/issue-order-manager/issue-lot-order/IssueOrderRequest';
import EntityListTable from '@components/framework/table/EntityListTable';

/**
 * 来料单显示
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
        let showData = []
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        let object = {
            documentId: record.name,
            success: function(responseBody) {
                let mLots = responseBody.materialLotList;
                if(mLots){
                    mLots.forEach(mLot=>{
                        if("Issue" != mLot.status){
                            showData.push(mLot);
                        }
                    })
                }
                self.props.issueLotScanTable.setState({tableData: showData})
            }
        }
        IssueOrderRequest.sendGetIssueLotInfoRequest(object);
    }

    /**
     * 接收数据不具备可删除等操作
     */
    buildOperationColumn = () => {
        
    }

}
