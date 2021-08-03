import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import MaterialLotHoldTable from "@components/mms/table/MaterialLotHoldTable";
import EntityScanProperties from "@properties/framework/EntityScanProperties";

export default class MaterialLotHoldProperties extends EntityScanProperties{

    static displayName = 'MaterialLotHoldProperties';
    
    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
    } 

    loadDataInComponentDidMount = () => {
        let materialLotHoldDialogTableName = this.state.parameters.parameter1;
        let self = this;
        let requestObject = {
            name: materialLotHoldDialogTableName,
            success: function(responseBody) {
                self.setState({
                    materialLotHoldActionTable: responseBody.table,
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    buildTable = () => {
        return <MaterialLotHoldTable
                        {...this.getDefaultTableProps()} 
                        resetData = {this.resetData}
                        pagination={false} 
                        holdActionTable = {this.state.materialLotHoldActionTable}
                        />
    }  
}