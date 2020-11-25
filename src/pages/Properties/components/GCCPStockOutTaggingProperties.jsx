import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import CPStockOutTaggingTable from "../../../components/Table/CPStockOutTaggingTable";

export default class GCCPStockOutTaggingProperties extends EntityScanProperties{

    static displayName = 'GCCPStockOutTaggingProperties';
      

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
        return <CPStockOutTaggingTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading}
                                    onSearch={this.queryData.bind(this)} 
                                    resetData={this.resetData.bind(this)}/>
    }

}