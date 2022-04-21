import EntityProperties from "./entityProperties/EntityProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import HNWarehouseRecordExpressNumberTable from "../../../components/Table/gc/HNWarehouseRecordExpressNumberTable";

export default class HNWarehouseRecordExpressNumberProperties extends EntityProperties{

    static displayName = 'HNWarehouseRecordExpressNumberProperties';
    

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
        return <HNWarehouseRecordExpressNumberTable 
                            table={this.state.table} 
                            pagination={false}
                            data={this.state.tableData} 
                            loading={this.state.loading}
                            resetData={this.resetData.bind(this)}
                            resetFlag={this.state.resetFlag} />
    }

    
}