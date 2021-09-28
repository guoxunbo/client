import ReturnLotOrderRequest from '@api/return-material-manager/ReturnLotOrderRequest';
import EntityListTable from '@components/framework/table/EntityListTable';

export default class ReturnOrderTable extends EntityListTable {

    static displayName = 'ReturnOrderTable';

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
                let materialLots = responseBody.materialLotList;
                if(materialLots){
                    showData = responseBody.materialLotList;
                }
                self.props.orderScanProperties.setState({tableData: showData})
            }
        }
        ReturnLotOrderRequest.sendGetStockUpRequest(object);
    }

    buildOperationColumn = () => {
        
    }

}
