import EntityScanProperties from "./entityProperties/EntityScanProperties";
import StockOutCheckTable from "../../../components/Table/gc/StockOutCheckTable";
import EntityProperties from "./entityProperties/EntityProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";

/**
 * GC 出货前检验
 */
export default class StockOutCheckProperties extends EntityProperties{

    static displayName = 'StockOutCheckProperties';
      
    getTableData = () => {
        const self = this;
        let requestObject = {
            tableRrn: this.state.tableRrn,
            success: function(responseBody) {
            self.setState({
                table: responseBody.table,
                loading: false
            }); 
            }
        }
        TableManagerRequest.sendGetByRrnRequest(requestObject);
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
            self.form.resetFormFileds();
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <StockOutCheckTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}