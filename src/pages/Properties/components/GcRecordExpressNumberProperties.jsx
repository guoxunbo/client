import EntityProperties from "./entityProperties/EntityProperties";
import RecordExpressNumberTable from "../../../components/Table/gc/RecordExpressNumberTable";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";

export default class GcRecordExpressNumberProperties extends EntityProperties{

    static displayName = 'GcRecordExpressNumberProperties';
    
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
        return <RecordExpressNumberTable table={this.state.table} pagination={false}
                        data={this.state.tableData} loading={this.state.loading} />
    }

    
}