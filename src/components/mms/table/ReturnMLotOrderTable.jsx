import ReturnLotOrderRequest from '@api/return-material-manager/ReturnLotOrderRequest';
import EntityListTable from '@components/framework/table/EntityListTable';

export default class ReturnMLotOrderTable extends EntityListTable {

    static displayName = 'ReturnMLotOrderTable';

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

    selectRow = (record) => {
        let self = this;
        let selectedRows = [];
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        let showData = [];
        let object = {
            documentId: record.name,
            success: function(responseBody) {
                showData = responseBody.materialLotList;
                self.props.orderScanTable.setState({tableData: showData})
            }
        }
        ReturnLotOrderRequest.sendGetReturnLotInfoRequest(object);
    }

    buildOperationColumn = () => {
        
    }

}
