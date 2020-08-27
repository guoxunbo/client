import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import WaferUnStockOutTaggingTable from "../../../components/Table/WaferUnStockOutTaggingTable";
import EntityProperties from "./entityProperties/EntityProperties";

export default class GCWaferUnStockOutTaggingProperties extends EntityProperties{

    static displayName = 'GCWaferUnStockOutTaggingProperties';
    
    queryData = (whereClause) => {
      const self = this;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          self.setState({
            tableData: responseBody.dataList,
            loading: false
          });
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <WaferUnStockOutTaggingTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}