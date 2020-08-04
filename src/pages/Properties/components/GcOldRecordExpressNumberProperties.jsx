import EntityProperties from "./entityProperties/EntityProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import RecordExpressNumberOldTable from "../../../components/Table/gc/RecordExpressNumberOldTable";

export default class GcOldRecordExpressNumberProperties extends EntityProperties{

    static displayName = 'GcOldRecordExpressNumberProperties';
    

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
        return <RecordExpressNumberOldTable 
                            table={this.state.table} 
                            data={this.state.tableData} 
                            pagination={false}
                            loading={this.state.loading}
                            resetData={this.resetData.bind(this)}
                            resetFlag={this.state.resetFlag} />
    }

    
}