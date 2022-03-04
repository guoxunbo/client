import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GCRwStockOutTaggingUpdateTable from "../../../components/Table/gc/GCRwStockOutTaggingUpdateTable";
import EntityScanProperties from "./entityProperties/EntityScanProperties";

export default class GCRwStockOutTaggingUpdateProperties extends EntityScanProperties{

    static displayName = 'GCRwStockOutTaggingUpdateProperties';

    resetData = () => {
      this.setState({
        selectedRowKeys: [],
        selectedRows: [],
        tableData: [],
        loading: false,
        resetFlag: true
      });
      this.form.resetFormFileds();
    }
    
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
        return <GCRwStockOutTaggingUpdateTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    onSearch={this.queryData}
                                    resetData={this.resetData.bind(this)}/>
    }

}