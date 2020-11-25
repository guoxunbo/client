import EntityProperties from "./entityProperties/EntityProperties";
import { ActionType } from "../../../api/gc/async-manager/AsyncManagerRequestBody";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import HKStockOutOrderTable from "../../../components/Table/gc/HKStockOutOrderTable";
import HKStockOutMLotScanProperties from "./HKStockOutMLotScanProperties";

/**
 * 香港仓其他出货单
 */
export default class HKStockOutOrderProperties extends EntityProperties{

    static displayName = 'HKStockOutOrderProperties';
    
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
        return <HKStockOutOrderTable scrollY={200} 
                                      pagination={false} 
                                      ref={(orderTable) => { this.orderTable = orderTable }} 
                                      asyncType={ActionType.AsyncSobOrder} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} />
    }

    buildOtherComponent = () => {
        return <HKStockOutMLotScanProperties 
                                              orderTable={this.orderTable} 
                                              tableRrn={465339} 
                                              resetFlag={this.state.resetFlag} 
                                              onSearch={this.getTableData.bind(this)}>
                                              </HKStockOutMLotScanProperties>
    }

}