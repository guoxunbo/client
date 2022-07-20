import EntityProperties from "./entityProperties/EntityProperties";
import { ActionType } from "../../../api/gc/async-manager/AsyncManagerRequestBody";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import FTStockOutOrderTable from "../../../components/Table/gc/FTStockOutOrderTable";
import GcFTStockOutMLotScanProperties from "./GcFTStockOutMLotScanProperties";

/**
 * FT出货单
 */
export default class GCFTStockOutOrderProperties extends EntityProperties{

    static displayName = 'GCFTStockOutOrderProperties';
    
    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
        this.resetReferenceData(null, null);
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

    afterQuery = (responseBody, whereClause) => {
      this.resetReferenceData(responseBody.dataList, "reserved8");
      this.setState({
        tableData: responseBody.dataList,
        loading: false,
        whereClause: whereClause
      });
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
        return <GcFTStockOutMLotScanProperties 
                                              orderTable={this.orderTable} 
                                              tableRrn={this.state.parameters.parameter1} 
                                              resetFlag={this.state.resetFlag} 
                                              onSearch={this.getTableData.bind(this)}>
                                              </GcFTStockOutMLotScanProperties>
    }

}