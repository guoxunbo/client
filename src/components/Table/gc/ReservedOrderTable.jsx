
import EntityListTable from '../EntityListTable';
import ReservedManagerRequest from '../../../api/gc/reserved-manager/ReservedManagerRequest';

export default class ReservedOrderTable extends EntityListTable {

    static displayName = 'ReservedOrderTable';

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
        this.setState({
            selectedRows: selectedRows
        });
        let object = {
            docLineRrn: record.objectRrn,
            tableRrn: this.props.reservedLotTable.state.table.objectRrn,
            success: function(responseBody) {
                self.props.reservedLotTable.setState({docLineRrn: record.objectRrn, tableData: responseBody.materialLotList})
            }
        }
        ReservedManagerRequest.sendGetMaterialLot(object);
    }

    createButtonGroup = () => {
       
    }

    buildOperationColumn = () => {
        
    }

}

