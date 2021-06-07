import EntityProperties from "./entityProperties/EntityProperties";
import { ActionType } from "../../../api/gc/async-manager/AsyncManagerRequestBody";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import ScrapRawMaterialShipOrderTable from "../../../components/Table/gc/ScrapRawMaterialShipOrderTable";
import GcScrapRawMaterialShipMLotScanProperties from "./GcScrapRawMaterialShipMLotScanProperties";

/**
 * 原材料报废出库单据
 */
export default class GcScrapRawMaterialShipOrderProperties extends EntityProperties{

    static displayName = 'GcScrapRawMaterialShipOrderProperties';
    
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
        return <ScrapRawMaterialShipOrderTable scrollY={200} pagination={false} 
                                      ref={(orderTable) => { this.orderTable = orderTable }} 
                                      asyncType={ActionType.AsyncMaterialIssueOrder} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} />
    }

    buildOtherComponent = () => {
        return <GcScrapRawMaterialShipMLotScanProperties orderTable={this.orderTable} 
                                              tableRrn={this.state.parameters.parameter1}
                                              waitShipTableRrn={this.state.parameters.parameter2}
                                              resetFlag={this.state.resetFlag} 
                                              onSearch={this.getTableData.bind(this)} />
    }

}