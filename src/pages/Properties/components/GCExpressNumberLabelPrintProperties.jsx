import EntityProperties from "./entityProperties/EntityProperties";
import GCExpressNumberLabelPrintTable from "../../../components/Table/gc/GCExpressNumberLabelPrintTable";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";

export default class GCExpressNumberLabelPrintProperties extends EntityProperties{

    static displayName = 'GCExpressNumberLabelPrintProperties';
    
    resetData = () => {
      this.setState({
        selectedRowKeys: [],
        selectedRows: [],
        tableData: [],
        loading: false,
        resetFlag: true
      });
    }

    getTableData = () => {
        const self = this;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          success: function(responseBody) {
            self.setState({
              tableData: responseBody.dataList,
              table: responseBody.table,
              loading: false
            }); 
            self.form.handleSearch();
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <GCExpressNumberLabelPrintTable 
                            table={this.state.table} 
                            data={this.state.tableData} 
                            loading={this.state.loading}
                            resetData={this.resetData.bind(this)}
                            resetFlag={this.state.resetFlag} />
    }

    
}