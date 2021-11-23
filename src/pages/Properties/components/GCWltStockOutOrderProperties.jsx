import EntityProperties from "./entityProperties/EntityProperties";
import { ActionType } from "../../../api/gc/async-manager/AsyncManagerRequestBody";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import WltStockOutOrderTable from "../../../components/Table/gc/WltStockOutOrderTable";
import GcWltStockOutMLotScanProperties from "./GcWltStockOutMLotScanProperties";

/**
 * WLT/CP出货单
 */
export default class GCWltStockOutOrderProperties extends EntityProperties{

    static displayName = 'GCWltStockOutOrderProperties';
    
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
        return <WltStockOutOrderTable scrollY={200} 
                                      pagination={false} 
                                      ref={(orderTable) => { this.orderTable = orderTable }} 
                                      asyncType={ActionType.AsyncWltShipOrder} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} />
    }

    buildOtherComponent = () => {
        return <GcWltStockOutMLotScanProperties 
                                              orderTable={this.orderTable} 
                                              tableRrn={this.state.parameters.parameter1} 
                                              resetFlag={this.state.resetFlag} 
                                              onSearch={this.getTableData.bind(this)}>
                                              </GcWltStockOutMLotScanProperties>
    }

}