import EntityListTable from '@components/framework/table/EntityListTable';

/**
 * 创建指定物料 领料单
 */
export default class CreateIssueOrderByMaterialTable extends EntityListTable{

    static displayName = 'CreateIssueOrderByMaterialTable';

    
    constructor(props){
        super(props);
        this.state = {...this.state};
    }

    selectRow = (record) => {
        let rowKey = this.props.rowKey || DefaultRowKey;
        const selectedRowKeys = [...this.state.selectedRowKeys];
        const selectedRows = [...this.state.selectedRows];

        let checkIndex = selectedRowKeys.indexOf(record[rowKey]);
        if (checkIndex >= 0) {
            selectedRowKeys.splice(checkIndex, 1);
            selectedRows.splice(checkIndex, 1);
        } else {
            selectedRowKeys.push(record[rowKey]);
            selectedRows.push(record);
        }
        this.setState({ 
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
        });
        
        this.props.pickOrderProperties.setState({
            tableData: selectedRows,
        })
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
    }

    createButtonGroup = () => {
        
    }

    buildOperationColumn() {

    }

}