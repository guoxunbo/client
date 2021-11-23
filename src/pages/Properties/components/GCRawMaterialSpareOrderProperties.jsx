import EntityProperties from "./entityProperties/EntityProperties";
import { ActionType } from "../../../api/gc/async-manager/AsyncManagerRequestBody";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GcRawMaterialSpareMLotProperties from "./GcRawMaterialSpareMLotProperties";
import GcRawMaterialSpareOrderTable from "../../../components/Table/gc/GcRawMaterialSpareOrderTable";

/**
 * 原材料备料单据
 */
export default class GCRawMaterialSpareOrderProperties extends EntityProperties{

    static displayName = 'GCRawMaterialSpareOrderProperties';
    
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
        return <GcRawMaterialSpareOrderTable scrollY={200} 
                                      pagination={false} 
                                      ref={(spareOrderTable) => { this.spareOrderTable = spareOrderTable }} 
                                      asyncType={ActionType.AsyncMaterialIssueOrder} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} 
                                      spareMaterialTable={this.spareMaterialTable}/>
    }

    buildOtherComponent = () => {
        return <GcRawMaterialSpareMLotProperties 
                                              ref={(spareMaterialTable) => { this.spareMaterialTable = spareMaterialTable }} 
                                              spareOrderTable={this.spareOrderTable} 
                                              tableRrn={this.state.parameters.parameter1}
                                              resetFlag={this.state.resetFlag} 
                                              onSearch={this.getTableData.bind(this)}>
                                              </GcRawMaterialSpareMLotProperties>
    }

}