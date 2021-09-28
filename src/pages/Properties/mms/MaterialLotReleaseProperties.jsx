import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import MaterialLotReleaseTable from "@components/mms/table/MaterialLotReleaseTable";
import EntityProperties from "@properties/framework/EntityProperties";

export default class MaterialLotReleaseProperties extends EntityProperties{

    static displayName = 'MaterialLotReleaseProperties';
    
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
        let materialLotReleaseDialogTableName = this.state.parameters.parameter1;
        let self = this;
        let requestObject = {
            name: materialLotReleaseDialogTableName,
            success: function(responseBody) {
                self.setState({
                    materialLotReleaseActionTable: responseBody.table,
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    buildTable = () => {
        return <MaterialLotReleaseTable
                        {...this.getDefaultTableProps()} 
                        pagination={false} 
                        properties = {this}
                        ref = {(releaseTable) => {this.releaseTable = releaseTable}}
                        releaseActionTable = {this.state.materialLotReleaseActionTable}/>
    }  
}