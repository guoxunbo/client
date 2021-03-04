import IssueMaterialOrderRequest from '@api/issue-order-manager/issue-material-order/IssueMaterialOrderRequest';
import EntityListTable from '@components/framework/table/EntityListTable';

export default class IssueMaterialOrderTable extends EntityListTable {

    static displayName = 'IssueMaterialOrderTable';

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
        selectedRows.push(record);
        self.setState({
            selectedRows: selectedRows
        });
        self.props.issueMaterialScanTable.setState({tableData: []})
    }

    /**
     * 接收数据不具备可删除等操作
     */
    buildOperationColumn = () => {
        
    }

}
