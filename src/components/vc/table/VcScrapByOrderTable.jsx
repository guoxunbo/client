import ReturnLotOrderRequest from "@api/return-material-manager/ReturnLotOrderRequest";
import CheckMLotRequest from "@api/vc/check-mlot-manager/CheckMLotRequest";
import ScrapMLotRequest from "@api/vc/scrap-mlot-manager/ScrapMLotRequest";
import EntityListTable from "@components/framework/table/EntityListTable";

/**
 * by单据报废
 */
export default class VcScrapByOrderTable extends EntityListTable {

    static displayName = 'VcScrapByOrderTable';

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
                self.props.scanProperties.setState({tableData: showData})
            }
        }
        ReturnLotOrderRequest.sendGetStockUpRequest(object);
    }

    buildOperationColumn = () => {
        
    }

}