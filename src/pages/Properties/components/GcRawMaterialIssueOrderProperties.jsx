import EntityProperties from "./entityProperties/EntityProperties";
import { ActionType } from "../../../api/gc/async-manager/AsyncManagerRequestBody";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import RewMaterialOrderTable from "../../../components/Table/gc/RewMaterialOrderTable";
import GcRawMaterialIssueMLotScanProperties from "./GcRawMaterialIssueMLotScanProperties";

/**
 * 原材料发料单
 */
export default class GcRawMaterialIssueOrderProperties extends EntityProperties{

    static displayName = 'GcRawMaterialIssueOrderProperties';
    
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
        return <RewMaterialOrderTable scrollY={200} pagination={false} 
                                      ref={(orderTable) => { this.orderTable = orderTable }} 
                                      asyncType={ActionType.AsyncMaterialIssueOrder} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} />
    }

    buildOtherComponent = () => {
        return <GcRawMaterialIssueMLotScanProperties orderTable={this.orderTable} 
                                              tableRrn={469565} 
                                              resetFlag={this.state.resetFlag} 
                                              onSearch={this.getTableData.bind(this)}>
                                              </GcRawMaterialIssueMLotScanProperties>
    }

}