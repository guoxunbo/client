import EntityProperties from "./entityProperties/EntityProperties";
import { ActionType } from "../../../api/gc/async-manager/AsyncManagerRequestBody";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import FTStockOutOrderTable from "../../../components/Table/gc/FTStockOutOrderTable";
import BSWMLotsSaleStockOutMLotScanProperties from "./BSWMLotsSaleStockOutMLotScanProperties";

/**
 * 保税仓 “成品销售出货”，同“出货”下的“FT出货”功能
 * FT出货单
 */
export default class BSWMLotsSaleStockOutOrderProperties extends EntityProperties{

    static displayName = 'BSWMLotsSaleStockOutOrderProperties';
    
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
        return <FTStockOutOrderTable scrollY={200} 
                                      pagination={false} 
                                      ref={(orderTable) => { this.orderTable = orderTable }} 
                                      asyncType={ActionType.AsyncSoaOrder} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} />
    }

    buildOtherComponent = () => {
        return <BSWMLotsSaleStockOutMLotScanProperties
                                              orderTable={this.orderTable} 
                                              tableRrn={this.state.parameters.parameter1} 
                                              resetFlag={this.state.resetFlag} 
                                              onSearch={this.getTableData.bind(this)}/>
    }

}